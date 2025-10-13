import React, { useState } from "react"
import gallery1 from "../assets/gallery1.jpg"
import gallery2 from "../assets/gallery2.jpg"
import gallery3 from "../assets/gallery3.jpg"
import gallery4 from "../assets/gallery4.jpg"

export default function Portfolio() {
  const [active, setActive] = useState(null)

  const items = [
    { src: gallery1, label: "Studio Session", photos: [gallery1, gallery2] },
    { src: gallery2, label: "Wedding Coverage", photos: [gallery2, gallery3] },
    { src: gallery3, label: "Product Shoot", photos: [gallery3, gallery4] },
    { src: gallery4, label: "Portrait Session", photos: [gallery4, gallery1] },
  ]

  return (
    <section id="portfolio" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl text-orange font-semibold mb-8 text-center"
          data-aos="fade-up"
        >
          Our Work
        </h2>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
              data-aos="zoom-in"
              onClick={() => setActive(it)}
            >
              <img
                src={it.src}
                alt={it.label}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="w-full text-center py-3 text-orange font-medium">
                  {it.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

{/* Modal */}
{active && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
    onClick={() => setActive(null)}
  >
    <div
      className="bg-[#EDEAE0]/95 rounded-2xl max-w-6xl w-[95%] max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl"
      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
    >
      {/* Close Button */}
      <button
        onClick={() => setActive(null)}
        className="absolute top-4 right-5 text-gray-500 hover:text-black text-4xl font-bold"
      >
        &times;
      </button>

      {/* Title */}
      <h3 className="text-3xl font-semibold text-[#1A1A1A] mb-6 text-center">
        {active.label}
      </h3>

      {/* Gallery Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {active.photos.map((photo, i) => (
          <img
            key={i}
            src={photo}
            alt=""
            className="w-full rounded-lg mb-4 break-inside-avoid hover:scale-[1.02] transition-transform duration-300"
          />
        ))}
      </div>
    </div>
  </div>
)}

    </section>
  )
}
