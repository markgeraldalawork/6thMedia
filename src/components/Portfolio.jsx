import React from "react"
import gallery1 from "../assets/gallery1.jpg"
import gallery2 from "../assets/gallery2.jpg"
import gallery3 from "../assets/gallery3.jpg"
import gallery4 from "../assets/gallery4.jpg"
export default function Portfolio() {
  const items = [
    { src: gallery1, label: "Studio Session" },
    { src: gallery2, label: "Wedding Coverage" },
    { src: gallery3, label: "Product Shoot" },
    { src: gallery4, label: "Portrait Session" },
  ]

  return (
    <section id="portfolio" className="py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl text-orange font-semibold mb-8 text-center" data-aos="fade-up">Our Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden group" data-aos="zoom-in">
              <img src={it.src} alt={it.label} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="w-full text-center py-3 text-orange font-medium">{it.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
