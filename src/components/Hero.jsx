import React, { useRef, useEffect } from "react"

export default function Hero() {
  const vidRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (vidRef.current) {
        vidRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.25}px, 0)`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* 🎥 Video background */}
      <video
        ref={vidRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/video/vid.mp4"
      />

      {/* 🟣 Optional overlay gradient (use semi-transparent to see the video) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

      {/* 📄 Content */}
      <div className="relative z-10 px-6 text-white" data-aos="fade-up">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
          Capturing Stories Through the Lens
        </h1>
        <p className="text-gray-200 mb-6 max-w-xl mx-auto">
          Where creativity meets precision — crafted with passion.
        </p>
        <a
          href="#portfolio"
          className="inline-block bg-orange px-6 py-3 rounded-full font-medium hover:brightness-95 transition"
        >
          View Portfolio
        </a>
      </div>

      {/* ⬇️ Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-7 h-12 border-2 border-orange rounded-full flex items-start justify-center">
          <div className="w-1.5 h-1.5 bg-orange rounded-full mt-2 animate-smoothBounce"></div>
        </div>
      </div>
    </section>
  )
}
