import React from "react"
import Spline from "@splinetool/react-spline"

export default function About() {
  return (
    <section id="about" className="py-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10" data-aos="fade-up">
        
        {/* Spline Model - positioned left but balanced */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <div className="w-[350px] h-[350px] lg:w-[650px] lg:h-[500px]">
            <Spline scene="/robot.splinecode" />
          </div>
        </div>

        {/* About Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl text-orange font-semibold mb-4">About Us</h2>
          <p className="text-gray-300 leading-relaxed">
            At 6th Media Studio, we specialize in timeless photography — from portraits and events to brand visuals. 
            Our goal is to capture authentic stories and transform them into lasting memories with artistic precision.
          </p>
        </div>
      </div>
    </section>
  )
}
