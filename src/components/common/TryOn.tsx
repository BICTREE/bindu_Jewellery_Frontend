"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

type TryOnProps = {
  productImage: string; // PNG with transparency
  onClose: () => void;
};

const TryOn = ({ productImage, onClose }: TryOnProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const productImgRef = useRef<HTMLImageElement>(new Image());

  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Put your models in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  // Preload product image
  useEffect(() => {
    productImgRef.current.src = productImage;
  }, [productImage]);

  // Start webcam
  useEffect(() => {
    if (!modelsLoaded) return;

    const startVideo = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Cannot access webcam:", err);
        }
      }
    };

    startVideo();
  }, [modelsLoaded]);

  // Detect face and draw overlay
  useEffect(() => {
    if (!modelsLoaded) return;

    let animationFrameId: number;

    const drawLoop = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Match canvas size to video
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      const context = canvas.getContext("2d");
      if (!context) return;

      // Detect face
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video frame
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (detection) {
        const landmarks = detection.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        const nose = landmarks.getNose();

        // Calculate face width (eye distance)
        const dx = rightEye[3].x - leftEye[0].x;
        const dy = rightEye[3].y - leftEye[0].y;
        const faceWidth = Math.hypot(dx, dy);

        // Calculate rotation angle
        const angle = Math.atan2(dy, dx);

        // Position: center between eyes
        const centerX = (leftEye[0].x + rightEye[3].x) / 2;
        const centerY = (leftEye[0].y + rightEye[3].y) / 2;

        // Set overlay size relative to face width
        const width = faceWidth * 1.5; // adjust scaling factor
        const height = width * (productImgRef.current.height / productImgRef.current.width);

        // Draw rotated product
        context.save();
        context.translate(centerX, centerY - faceWidth * 0.2); // shift up slightly
        context.rotate(angle);
        context.drawImage(
          productImgRef.current,
          -width / 2,
          -height / 2,
          width,
          height
        );
        context.restore();
      }

      animationFrameId = requestAnimationFrame(drawLoop);
    };

    drawLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [modelsLoaded]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded w-full max-w-lg">
        <button
          className="absolute top-2 right-2 text-red-500 font-bold text-lg"
          onClick={onClose}
        >
          ×
        </button>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-auto rounded"
          style={{ display: modelsLoaded ? "block" : "none" }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
        />
        {!modelsLoaded && <p>Loading models...</p>}
      </div>
    </div>
  );
};

export default TryOn;
