import React from "react"
import { useState, useEffect } from 'react'
import darkThemeLogo from "../assets/logoWObg.png"
import lightThemeLogo from "../assets/logoWbg.jpg"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

useEffect(() => {
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "light") {
    document.documentElement.classList.remove("dark")
    setDarkMode(false)
  } else {
    document.documentElement.classList.add("dark")
    setDarkMode(true)
  }
}, [])

const toggleTheme = () => {
  const html = document.documentElement
  html.classList.toggle("dark")

  const isDark = html.classList.contains("dark")
  setDarkMode(isDark)
  localStorage.setItem("theme", isDark ? "dark" : "light")
}

  return (
    <header className={`fixed w-full z-50 transition-all ${
      scrolled 
      ? 'bg-[var(--header-bg)]/80 text-[var(--text)] backdrop-blur-md py-3'
      : 'bg-[var(--header-bg)]/40 text-[var(--header-text)] py-5'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between ">
<div className="flex items-center" data-aos="fade-down">
  <img
    src={darkMode ? darkThemeLogo : lightThemeLogo}
    alt="logo"
    className="h-12 md:h-14 cursor-pointer"
    onClick={() => {
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Remove hash from the URL (if any)
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }}
  />
</div>
        <nav className="hidden md:flex gap-8 items-center bg-[var(--header-bg)">
          <a href="#about" className="hover:text-orange transition">About</a>
          <a href="#portfolio" className="hover:text-orange transition">Portfolio</a>
          <a href="#services-menu" className="hover:text-orange transition">Services</a>
          <a href="#contact" className="hover:text-orange transition">Contact</a>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full border border-orange text-orange hover:bg-orange hover:text-[var(--bg)] transition"
            aria-label="Toggle theme"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
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
      className={`block w-7 h-0.5 bg-orange transition-all duration-300  ${
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
      <div className={`md:hidden ${open ? 'block' : 'hidden'} bg-[var(--bg)]/90 mt-2 text-[var(--text)]`}>
        <div className="flex items-center flex-col px-6 py-4 gap-4">
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#portfolio" onClick={() => setOpen(false)}>Portfolio</a>
          <a href="#services-menu" onClick={() => setOpen(false)}>Services</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full border border-orange text-orange hover:bg-orange hover:text-[var(--bg)] transition"
            aria-label="Toggle theme"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  )
}
