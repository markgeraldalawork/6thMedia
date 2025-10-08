import React from "react"
import { useState, useEffect } from 'react'
import logo from "../assets/logoWObg.png"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed w-full z-50 transition-all ${scrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-black/40 py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center" data-aos="fade-down">
          <img src={logo} alt="logo" className="h-12 md:h-14" />
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          <a href="#about" className="hover:text-orange transition">About</a>
          <a href="#portfolio" className="hover:text-orange transition">Portfolio</a>
          <a href="#services" className="hover:text-orange transition">Services</a>
          <a href="#contact" className="hover:text-orange transition">Contact</a>
        </nav>

<div className="md:hidden">
  <button onClick={() => setOpen(!open)} className="flex flex-col justify-center items-center space-y-1">
    {/* Top bar */}
    <span
      className={`block w-7 h-0.5 bg-orange transition-transform duration-300 origin-center ${
        open ? 'rotate-45 translate-y-1.5' : ''
      }`}
    ></span>

    {/* Middle bar */}
    <span
      className={`block w-7 h-0.5 bg-orange transition-all duration-300 ${
        open ? 'opacity-0' : 'opacity-100'
      }`}
    ></span>

    {/* Bottom bar */}
    <span
      className={`block w-7 h-0.5 bg-orange transition-transform duration-300 origin-center ${
        open ? '-rotate-45 -translate-y-1.5' : ''
      }`}
    ></span>
  </button>
</div>

      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? 'block' : 'hidden'} bg-black/90 mt-2`}>
        <div className="flex flex-col px-6 py-4 gap-4">
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#portfolio" onClick={() => setOpen(false)}>Portfolio</a>
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </div>
    </header>
  )
}
