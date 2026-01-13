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
    <>
      {/* --- Main Hero Section --- */}
      <section
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        aria-label="6th Media Studio Hero Section in Legazpi City, Albay"
      >
        {/* 🎥 Video background */}
        <video
          ref={vidRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/video/vid.webm" type="video/webm" />
          <source src="/video/vid.mp4" type="video/mp4" />
        </video>

        {/* 🟣 Overlay gradient (lighter so video is visible) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50"
          aria-hidden="true"
        ></div>

        {/* 📄 Visible Content */}
        <div className="relative z-10 px-6 text-white" data-aos="fade-up">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            6th Media Studio
          </h1>
          <p className="text-gray-200 mb-6 max-w-xl mx-auto">
            Capturing Memories & Milestones Through Cinematic Videos
          </p>
          <a
            href="#portfolio"
            className="inline-block bg-orange px-6 py-3 rounded-full font-medium hover:brightness-95 transition"
          >
            View Portfolio
          </a>
        </div>

        {/* ⬇️ Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          aria-hidden="true"
        >
          <div className="w-7 h-12 border-2 border-orange rounded-full flex items-start justify-center">
            <div className="w-1.5 h-1.5 bg-orange rounded-full mt-2 animate-smoothBounce"></div>
          </div>
        </div>
      </section>

      {/* --- Hidden SEO Content --- */}
      <section className="sr-only">
        6th Media Studio, based in Legazpi City, Albay, delivers high-quality
        video production, photography, and creative media services focused
        on capturing memories, milestones, and important moments for
        individuals and businesses.
      </section>
    </>
  )
}
