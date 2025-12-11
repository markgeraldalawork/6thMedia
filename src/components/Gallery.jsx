import React, { useState, useEffect, useRef } from "react";

export default function Gallery({
  thumbs = [],
  handleCategoryClick,
  handleImageLoad,
  loadedImages = {},
  active,
  setActive,
  fullscreen,
  setFullscreen,
  loading,
  logo,
}) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const batchSize = 2;
  const scrollRef = useRef(null);

  // Track visible images for iOS
  const [iosVisibleCount, setIosVisibleCount] = useState(batchSize);

  // Reset visible count whenever a new gallery opens on iOS
  useEffect(() => {
    if (active && active.photos && isIOS) {
      setIosVisibleCount(Math.min(batchSize, active.photos.length));
    }
  }, [active?.label, active?.photos?.length, isIOS]);

  // Scroll handler to load more images
  const handleScroll = () => {
    if (!scrollRef.current || !active) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    // Load next batch when near bottom
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setIosVisibleCount((prev) =>
        Math.min(prev + batchSize, active.photos.length)
      );
    }
  };

  // Only render modal if photos exist
  const modalReady = active && active.photos && active.photos.length > 0;

  return (
    <>
      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[90rem] mx-auto">
        {thumbs.map((it, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            data-aos="zoom-in"
            onClick={() => handleCategoryClick(it)}
          >
            <img
              src={it.src}
              alt={it.label}
              loading="lazy"
              onLoad={() => handleImageLoad(it.src)}
              className={`w-full h-90 object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl ${
                loadedImages[it.src] ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
              <div className="w-full text-center py-4 text-orange font-semibold tracking-wide text-lg">
                {it.label}
              </div>
            </div>
          </div>
        ))}
      </div>

{/* Modal Gallery */}
{modalReady && (
  <div
    key={active.label}
    className={`fixed inset-0 bg-black/50 ${!isIOS ? "backdrop-blur-sm" : ""} flex items-center justify-center z-50 animate-fadeIn`}
    onClick={() => setActive(null)}
  >
    <div
      ref={scrollRef}
      onScroll={isIOS ? handleScroll : undefined}
      className="bg-[#EDEAE0]/95 rounded-2xl max-w-6xl w-[95%] p-8 relative shadow-2xl transform transition-all duration-300 scale-95 animate-[fadeInModal_0.5s_ease_forwards] flex flex-col" // add flex and flex-col here
      style={
        isIOS
          ? { maxHeight: "80vh", overflowY: "auto", WebkitOverflowScrolling: "touch", transform: "translateZ(0)" }
          : { maxHeight: "90vh", overflowY: "auto" }
      }
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setActive(null)}
        className="absolute top-4 right-5 text-gray-500 hover:text-black text-4xl font-bold"
      >
        &times;
      </button>

      <h3 className="text-3xl font-semibold text-[#1A1A1A] mb-6 text-center">
        {active.label}
      </h3>

      {/* Scrollable inner content */}
      <div className="flex-grow"> {/* This makes the gallery scrollable while keeping the footer at the bottom */}
        {isIOS ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {active.photos.slice(0, iosVisibleCount).map((photo, i) => (
              <div key={i}>
                <img
                  src={photo}
                  alt=""
                  loading="lazy"
                  onLoad={() => handleImageLoad(photo)}
                  onClick={() => setFullscreen(photo)}
                  className={`w-full rounded-lg mb-4 cursor-pointer transition-transform duration-300 hover:scale-[1.05] ${
                    loadedImages[photo] ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 fade-in">
            {active.photos.map((photo, i) => (
              <div key={i} className="break-inside-avoid">
                <img
                  src={photo}
                  alt=""
                  loading="lazy"
                  onLoad={() => handleImageLoad(photo)}
                  onClick={() => setFullscreen(photo)}
                  className={`w-full rounded-lg mb-4 cursor-pointer transition-transform duration-300 hover:scale-[1.05] ${
                    loadedImages[photo] ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer (for Wedding Coverage only) */}
      {active.label === "Wedding Coverage" && (
        <div className="mt-4 text-center text-sm opacity-80">
          <p className="text-black">&copy; {new Date().getFullYear()} Art Photography</p>
        </div>   
      )}
    </div>
  </div>
)}

      {/* Fullscreen Viewer */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] animate-fadeIn"
          onClick={() => setFullscreen(null)}
        >
          <img
            src={fullscreen}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 hover:scale-[1.02] hover:brightness-110"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setFullscreen(null)}
            className="absolute top-6 right-8 text-white text-5xl font-bold hover:text-orange"
          >
            &times;
          </button>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
          {logo && <img src={logo} alt="Loading" className="w-50 h-20 mb-4 animate-pulse" />}
          <div className="loader" /> 
          <p className="text-orange text-lg font-semibold tracking-wide">Opening gallery...</p>
        </div>
      )}
    </>
  );
}
