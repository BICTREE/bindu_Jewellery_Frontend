import { useEffect, useState } from "react";

interface GoldRate {
  html: string | null;      // full incoming HTML
  rate24k: string | null;   // extracted value
  rate22k: string | null;
  rate18k: string | null;
  updatedAt: string | null;
}

export default function useGoldRate(): GoldRate {
  const [goldRate, setGoldRate] = useState<GoldRate>({
    html: null,
    rate24k: null,
    rate22k: null,
    rate18k: null,
    updatedAt: null,
  });

  useEffect(() => {
    async function fetchGoldRate() {
      try {
        const res = await fetch(
          "https://www.bindujewellery.co.in/akshayanidhi/getonlinehead"
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const html = await res.text();

        const div = document.createElement("div");
        div.innerHTML = html;
        const marquee = div.querySelector("marquee")?.innerText || "";

        // Extract numbers with regex
        const rate24 = marquee.match(/24 kt.*?Rs\.\s*([\d,]+)/i)?.[1] || null;
        const rate22 = marquee.match(/22 kt.*?Rs\.\s*([\d,]+)/i)?.[1] || null;
        const rate18 = marquee.match(/18 kt.*?Rs\.\s*([\d,]+)/i)?.[1] || null;
        const updated = marquee.match(/Updated on : (.*)/i)?.[1] || null;

        setGoldRate({
          html,
          rate24k: rate24,
          rate22k: rate22,
          rate18k: rate18,
          updatedAt: updated,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching gold rate:", err.message);
        } else {
          console.error("Error fetching gold rate:", err);
        }
      }
    }

    fetchGoldRate();

    // refresh every 5 minutes
    const interval = setInterval(fetchGoldRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return goldRate;
}
