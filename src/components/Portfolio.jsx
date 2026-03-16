import React, { useState, useEffect } from "react";
import logo from "../assets/logoWObg.png";
import Gallery from "./Gallery";
import { fetchPhotos } from "../sanityClient";

const CATEGORIES = [
  "Studio Session",
  "Wedding Coverage",
  "Uncovered Yet Concealed",
  "Portrait Session",
];

export default function Portfolio() {
  const [active, setActive] = useState(null);
  const [fullscreen, setFullscreen] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [thumbs, setThumbs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageLoad = (src) =>
    setLoadedImages((prev) => ({ ...prev, [src]: true }));

  useEffect(() => {
  async function testFetch() {
    const data = await fetchPhotos();
    // console.log("Photos from Sanity portfolio:", data);
  }
  testFetch();
}, []);

  // 🔑 Fetch photos from Sanity
  useEffect(() => {
    async function loadFromSanity() {
      const data = await fetchPhotos();

      // Group by category
      const grouped = {};
      data.forEach((item) => {
        if (!grouped[item.category]) grouped[item.category] = [];
        if (item.imageUrl) grouped[item.category].push(item.imageUrl);
      });

      // Build thumbnails
      const thumbsData = CATEGORIES.filter(cat => grouped[cat]?.length).map(cat => ({
        label: cat,
        src: grouped[cat][0],
        photos: grouped[cat],
        
      }));
// console.log("ThumbsData:", thumbsData);

      setThumbs(thumbsData);
    }

    loadFromSanity();
  }, []);

  const handleCategoryClick = (item) => {
    if (!item.photos || item.photos.length === 0) return; 
    setLoading(true);
    setTimeout(() => {
      setActive({
        label: item.label,
        photos: item.photos,
      });
      setLoading(false);
    }, 1500);
  };

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (fullscreen) setFullscreen(null);
        else if (active) setActive(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreen, active]);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = active || fullscreen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [active, fullscreen]);

  return (
    <section id="portfolio" className="py-40 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl text-orange font-semibold mb-8 text-center">
          Our Work
        </h2>

        <Gallery
          thumbs={thumbs}
          handleCategoryClick={handleCategoryClick}
          handleImageLoad={handleImageLoad}
          loadedImages={loadedImages}
          active={active}
          setActive={setActive}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          loading={loading}
          logo={logo}
        />
      </div>
    </section>
  );
}

