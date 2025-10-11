"use client";

import Banner from "@/components/common/Banner/Banner";
import TryOn from "@/components/common/TryOn";
import JewelleryDetails from "@/components/jewellerydetails/JewelleryDetails";
import MayLikethis from "@/components/maylikethis/MayLikethis";
import { AppDispatch } from "@/redux/store";
import { incrementCartCountIfNew } from "@/redux/store/cartSlice";
import { AddToCart } from "@/services/cartService/cartService";
import { GetProductById } from "@/services/productService/productService";
import { useParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

// 🔍 Zoom Lens Component
const ProductImageWithLens = ({ src }: { src: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensSize, setLensSize] = useState(100);
  const [zoom, setZoom] = useState(2);
  const [imageError, setImageError] = useState(false);

  const [lensStyle, setLensStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
    backgroundPosition: "0px 0px",
  });

  // Fallback image
  const fallbackImage = "/assets/images/catmod-08.jpg";
  const displaySrc = imageError ? fallbackImage : src;

  // Update lens size & zoom based on container width (responsive)
  React.useEffect(() => {
    const updateLens = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.offsetWidth;

      if (width < 400) {
        setLensSize(60);
        setZoom(1.5);
      } else if (width < 768) {
        setLensSize(100);
        setZoom(1.8);
      } else {
        setLensSize(100);
        setZoom(2);
      }
    };

    updateLens();
    window.addEventListener("resize", updateLens);
    return () => window.removeEventListener("resize", updateLens);
  }, []);

  const moveLens = (x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const half = lensSize / 5;

    const lensX = Math.max(0, Math.min(x - half, rect.width - lensSize));
    const lensY = Math.max(0, Math.min(y - half, rect.height - lensSize));
    const bgX = -(x * zoom - half);
    const bgY = -(y * zoom - half);

    setLensStyle({
      display: "block",
      top: lensY,
      left: lensX,
      backgroundPosition: `${bgX}px ${bgY}px`,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    moveLens(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = containerRef.current!.getBoundingClientRect();
    moveLens(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const hideLens = () => setLensStyle(prev => ({ ...prev, display: "none" }));

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="relative w-full border rounded overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={hideLens}
      onTouchMove={handleTouchMove}
      onTouchEnd={hideLens}
    >
      <img
        src={displaySrc}
        alt="Product"
        className="w-full h-auto object-contain"
        onError={handleImageError}
      />

      <div
        className="absolute pointer-events-none border-2 border-[#d4b262] rounded-full shadow-lg"
        style={{
          width: lensSize,
          height: lensSize,
          backgroundImage: `url(${displaySrc})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${zoom * 550}%`,
          display: lensStyle.display,
          top: lensStyle.top,
          left: lensStyle.left,
          backgroundPosition: lensStyle.backgroundPosition,
        }}
      />
    </div>
  );
};

// Thumbnail Component with Error Handling
const ThumbnailImage = ({
  src,
  isSelected,
  onClick
}: {
  src: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "/assets/images/catmod-08.jpg";
  const displaySrc = imageError ? fallbackImage : src;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <img
      src={displaySrc}
      alt="Thumbnail"
      className={`w-full aspect-square object-cover border rounded cursor-pointer ${isSelected ? "border-[#d4b262]" : "border-gray-300"
        }`}
      onClick={onClick}
      onError={handleImageError}
    />
  );
};

type ProductImage = {
  _id: string;
  location: string;
};
type Thumbnail = {
  location: string;
  name: string;
  key: string;
};

type Product = {
  _id: string;
  name: string;
  productID: string;
  description: string;
  grossWeight: string;
  netWeight: string;
  stoneWeight: string;
  stoneCount: number;
  metalType: string;
  productDimensions: string;
  price: number;
  makingCharges: number;
  stonePrice: number;
  gst: number;
  thumbnail: Thumbnail;
  images: ProductImage[];
  variantItems: VariantItem[];
  isFeatured: boolean;
  tags: string[];
  features: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  stock: number;
  reviewCount?: number; // not in API but useful if you add reviews later
  totalGoldPrice:number
};

// Type definitions for variant items
type VariantOption = {
  _id: string;
  value: string;
};

type VariantSpec = {
  variationId: {
    _id: string;
    name: string;
  };
  optionId: VariantOption;
  _id: string;
};

type VariantItem = {
  _id: string;
  sku: string;
  stock: number;
  extraPrice: number;
  specs: VariantSpec[];
};

// 🔑 Main Product Page
const ProductPage = () => {
  const params = useParams();
  const slug = params.slug;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [showVariantWarning, setShowVariantWarning] = useState(false);
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // Handle the slug which can be string or string[]
    const productId = Array.isArray(slug) ? slug[0] : slug;

    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await GetProductById(productId);
        setProduct(data);

        // Set initial selected image with fallback
        const initialImage = data?.images?.[0]?.location || data?.thumbnail?.location || "/assets/images/catmod-08.jpg";
        setSelectedImage(initialImage);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // Group variant items by variation type (Size, Gold Color, etc.)
  const groupedVariants = React.useMemo(() => {
    if (!product?.variantItems) return {};

    const groups: Record<string, { options: VariantOption[]; variationId: string }> = {};

    product.variantItems.forEach((variant: VariantItem) => {
      variant.specs.forEach((spec: VariantSpec) => {
        const variationName = spec.variationId.name;

        if (!groups[variationName]) {
          groups[variationName] = {
            options: [],
            variationId: spec.variationId._id
          };
        }

        // Add option if it doesn't exist
        const optionExists = groups[variationName].options.some(
          opt => opt._id === spec.optionId._id
        );

        if (!optionExists) {
          groups[variationName].options.push(spec.optionId);
        }
      });
    });

    return groups;
  }, [product]);

  // Check if all required variants are selected
  const hasAllRequiredVariants = React.useMemo(() => {
    const requiredVariations = Object.keys(groupedVariants);
    return requiredVariations.every(variationName => selectedVariants[variationName]);
  }, [groupedVariants, selectedVariants]);

  // Get available variant combinations based on selected variants
  const availableVariants = React.useMemo(() => {
    if (!product?.variantItems || !hasAllRequiredVariants) return [];

    return product.variantItems.filter((variant: VariantItem) => {
      return Object.entries(selectedVariants).every(([variationName, selectedOptionId]) => {
        return variant.specs.some(
          (spec: VariantSpec) =>
            spec.variationId.name === variationName &&
            spec.optionId._id === selectedOptionId
        );
      });
    });
  }, [product, selectedVariants, hasAllRequiredVariants]);

  // Get current selected variant - only if all variants are selected
  const currentVariant = hasAllRequiredVariants && availableVariants.length > 0 ? availableVariants[0] : null;

  // Calculate final price with variant extra price
  const calculateFinalPrice = () => {
    const basePrice = product?.totalGoldPrice || 0;
    const makingCharges = product?.makingCharges || 0;
    const stonePrice = product?.stonePrice || 0;
    const gstPercentage = product?.gst || 0;
    const variantExtraPrice = currentVariant?.extraPrice || 0;

    const subtotal = basePrice + makingCharges + stonePrice + variantExtraPrice;
    const gstAmount = (subtotal * gstPercentage) / 100;
    return subtotal + gstAmount;
  };

  const finalPrice = calculateFinalPrice();
  const formattedPrice = finalPrice.toLocaleString('en-IN');

  // Handle variant selection
  const handleVariantChange = (variationName: string, optionId: string, optionValue: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variationName]: optionId
    }));
    // Hide warning when user starts selecting variants
    if (showVariantWarning) {
      setShowVariantWarning(false);
    }
  };

  // Handle Buy Now click
  const handleBuyNow = () => {
    if (Object.keys(groupedVariants).length > 0 && !hasAllRequiredVariants) {
      setShowVariantWarning(true);
      return;
    }
    // Proceed with buy now logic
    console.log("Proceeding with Buy Now");
  };

  // Handle Add to Cart click
  const handleAddToCart = async () => {
    if (Object.keys(groupedVariants).length > 0 && !hasAllRequiredVariants) {
      setShowVariantWarning(true);
      return;
    }

    try {
      if (!product) return;

      // Build `specs` array from selected variants
      const specs = Object.entries(selectedVariants).map(([variationName, optionId]) => {
        const variationId = groupedVariants[variationName]?.variationId;
        return {
          variationId,
          optionId,
        };
      });

      const payload = {
        productId: product._id,
        quantity,
        specs,
        giftWrap: false, // or add UI toggle
      };

      console.log("🛒 Sending payload:", payload);

      const response = await AddToCart(payload);
      // ✅ Update Redux store count immediately
      dispatch(incrementCartCountIfNew({ productId: product._id }));
      toast.success("Product added to cart!");
      console.log("Cart response:", response);
    } catch (err) {
      toast.error("Failed to add product to cart");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  // Prepare images array with fallback
  const images =
    product?.images?.length > 0
      ? product.images.map((img: ProductImage) => img.location)
      : product?.thumbnail?.location
        ? [product.thumbnail.location]
        : ["/assets/images/catmod-08.jpg"];


  // Generate star rating
  const generateRatingStars = (rating = 4) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-[#d4b262]" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <Banner Title={product.name || "Product Details"} />

      <div className="container">
        <div className="px-4 sm:px-6 lg:px-8 mt-10 md:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Image Gallery */}
            <div>
              <ProductImageWithLens src={selectedImage} />

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4 mt-4 col-auto">
                {images.map((img: string, i: number) => (
                  <ThumbnailImage
                    key={i}
                    src={img}
                    isSelected={selectedImage === img}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2">
                {product.name || "Product Name"}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-lg sm:text-xl">
                  {generateRatingStars()}
                </div>
                <span className="ml-2 text-gray-600 text-sm">({product.reviewCount || 1} Review)</span>
              </div>

              {/* Product Info */}
              <p className="text-gray-600 mb-1 text-sm sm:text-base">
                <span className="font-semibold">Product Code:</span> {product.productID || "N/A"}
              </p>
              <p className="text-gray-600 mb-1 text-sm sm:text-base">
                Free Shipping In India | Hallmarked Jewellery Available For Sale
              </p>
              <p className="text-green-600 font-semibold mb-4 text-sm sm:text-base">
                Availability: {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              {/* Weight Information */}
              {/* <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Gross Weight:</span> {product.grossWeight || "N/A"}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Net Weight:</span> {product.netWeight || "N/A"}
                </p>
                {product.stoneWeight && (
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Stone Weight:</span> {product.stoneWeight}
                  </p>
                )}
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">Metal Type:</span> {product.metalType || "N/A"}
                </p>
              </div> */}

              {/* Price */}
              <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-6">
                ₹{formattedPrice}{" "}
                {currentVariant?.extraPrice && currentVariant.extraPrice > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{(finalPrice - currentVariant.extraPrice).toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-base text-gray-600 block">
                  (Inclusive Of All Taxes)
                </span>
              </div>


              {/* Dynamic Variant Options */}
              {Object.entries(groupedVariants).map(([variationName, variantData]) => (
                <div key={variationName} className="mb-4">
                  <label className="block text-sm font-medium mb-2 capitalize">
                    {variationName.toLowerCase()}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variantData.options.map((option) => (
                      <button
                        key={option._id}
                        className={`px-4 py-2 border rounded-full text-sm transition ${selectedVariants[variationName] === option._id
                          ? "bg-[#d4b262] text-white border-[#d4b262]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#d4b262]"
                          }`}
                        onClick={() => handleVariantChange(variationName, option._id, option.value)}
                      >
                        {option.value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Show warning message only when user tries to buy/add to cart without selecting variants */}
              {showVariantWarning && Object.keys(groupedVariants).length > 0 && !hasAllRequiredVariants && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">
                    <i className="fa fa-exclamation-triangle mr-1"></i>
                    Please select all required options before adding to cart.
                  </p>
                </div>
              )}

              {/* Options */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-6 p-5">
                {/* Quantity */}
                <div className="w-[120px]">
                  <label className="block text-sm font-medium mb-1">Quantity</label>
                  <div className="flex items-center border border-gray-300 rounded bg-white">
                    <button
                      className="px-3 py-1 text-lg font-semibold"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 text-center border-x border-gray-300"
                    />
                    <button
                      className="px-3 py-1 text-lg font-semibold"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setTryOnOpen(true)}
                  className="group border border-gray-300 rounded-full px-3 sm:px-4 py-2 hover:bg-[#d4b262] flex items-center gap-2 text-sm sm:text-base transition">
                  <i className="fa fa-camera text-[#d4b262] group-hover:text-white transition"></i>
                  <span className="text-[#d4b262] group-hover:text-white transition">
                    Try It On
                  </span>
                </button>

                <button className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-xl sm:text-2xl border border-gray-300 rounded-full hover:bg-[#d4b262] transition">
                  <i className="fa fa-heart text-[#d4b262] group-hover:text-white transition"></i>
                </button>

                <button className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-xl sm:text-2xl border border-gray-300 rounded-full hover:bg-[#d4b262] transition">
                  <i className="fa fa-share-alt text-[#d4b262] group-hover:text-white transition"></i>
                </button>
              </div>

              {/* Buy / Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="w-full sm:w-auto bg-[#d4b262] text-white px-6 py-3 rounded hover:bg-yellow-600 transition"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
                <button
                  className="w-full sm:w-auto border border-[#d4b262] text-yellow-700 px-6 py-3 rounded hover:bg-yellow-50 transition"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </div>

              {/* Selected Variant Info - Only show when variants are selected */}
              {currentVariant && hasAllRequiredVariants && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-700 text-sm">
                    <span className="font-semibold">Selected Variant:</span>{" "}
                    {currentVariant.specs
                      .map((spec: VariantSpec) => spec.optionId.value) // <-- typed spec
                      .join(" + ")}
                    {currentVariant.extraPrice > 0 && (
                      <span className="ml-2">
                        (+₹{currentVariant.extraPrice.toLocaleString("en-IN")})
                      </span>
                    )}
                  </p>
                  <p className="text-green-700 text-sm">
                    <span className="font-semibold">Stock:</span> {currentVariant.stock} available
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <JewelleryDetails product={product} />
      <MayLikethis />
      {tryOnOpen && (
        <TryOn
          productImage={selectedImage} // make sure it's a PNG with transparent background
          onClose={() => setTryOnOpen(false)}

        />
      )}
    </>
  );
};

export default ProductPage;