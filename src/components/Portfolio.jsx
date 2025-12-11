import React, { useState, useEffect } from "react";
import logo from "../assets/logoWObg.png";
import Gallery from "./Gallery";

// ⚡ Import image folders (not eager)
const studioImages = import.meta.glob("../assets/studio/*.{jpg,jpeg,png,webp,avif}");
const weddingImages = import.meta.glob("../assets/weddingCoverage/*.{jpg,jpeg,png,webp,avif}");
const productImages = import.meta.glob("../assets/productShoot/*.{jpg,jpeg,png,webp,avif}");
const portraitImages = import.meta.glob("../assets/portraitSession/*.{jpg,jpeg,png,webp,avif}");

// Helper: load a folder’s images only when needed
async function loadPhotos(folder) {
  const imports = await Promise.all(Object.values(folder).map((f) => f()));
  return imports.map((mod) => mod.default);
}

export default function Portfolio() {
  const [active, setActive] = useState(null);
  const [fullscreen, setFullscreen] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [thumbs, setThumbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [galleryCache, setGalleryCache] = useState({});

  const folders = [
    { label: "Studio Session", folder: studioImages },
    { label: "Wedding Coverage", folder: weddingImages },
    { label: "Product Shoot", folder: productImages },
    { label: "Portrait Session", folder: portraitImages },
  ];

  // Load thumbs
  useEffect(() => {
    async function loadThumbs() {
      const results = await Promise.all(
        folders.map(async ({ folder, label }) => {
          const keys = Object.keys(folder);
          if (!keys.length) return null;
          const firstKey = keys[0];
          const mod = await folder[firstKey]();
          return { label, src: mod.default, folder };
        })
      );
      setThumbs(results.filter(Boolean));
    }
    loadThumbs();
  }, []);

  const handleImageLoad = (src) => setLoadedImages((prev) => ({ ...prev, [src]: true }));

  const handleCategoryClick = async (item) => {
    setLoading(true);
    const start = Date.now();
    let photos = galleryCache[item.label];

    if (!photos) {
      photos = await loadPhotos(item.folder);
      setGalleryCache((prev) => ({ ...prev, [item.label]: photos }));
    }

    const elapsed = Date.now() - start;
    const delay = Math.max(0, 1500 - elapsed);
    setTimeout(() => {
      setActive({ label: item.label, photos });
      setLoading(false);
    }, delay);
  };

  // Preload other galleries once one is opened
  useEffect(() => {
    if (active && Object.keys(galleryCache).length === 1) {
      folders.forEach(async ({ label, folder }) => {
        if (!galleryCache[label]) {
          const photos = await loadPhotos(folder);
          setGalleryCache((prev) => ({ ...prev, [label]: photos }));
        }
      });
    }
  }, [active]);

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

  // Lock background scroll when modal/fullscreen open
  useEffect(() => {
    document.body.style.overflow = active || fullscreen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [active, fullscreen]);

  return (
    <section id="portfolio" className="py-40 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl text-orange font-semibold mb-8 text-center" data-aos="fade-up">
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
