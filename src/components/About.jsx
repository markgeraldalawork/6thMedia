import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Tailwind lg breakpoint
    };

    handleResize(); // Check initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="about" className="py-10 relative overflow-hidden">
      <div
        className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10"
        data-aos="fade-up"
      >
        {/* Spline Model */}
        {!isMobile && (
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="w-[350px] h-[350px] lg:w-[650px] lg:h-[500px]">
              <Spline scene="/robot.splinecode" />
            </div>
          </div>
        )}

        {/* About Content */}
        <div className={`w-full ${!isMobile ? "lg:w-1/2" : ""} text-center lg:text-left`}>
          <h2 className="text-3xl text-orange font-semibold mb-4">
            About 6th Media Studio
          </h2>
          <p className="text-[var(--text)] leading-relaxed mb-4">
            6th Media Studio, based in Legazpi City, Albay, is a creative media studio
            specializing in high-quality photography and video production. We capture
            authentic stories, memorable events, and brand milestones with cinematic
            precision and artistic vision.
          </p>

          {/* Hidden SEO copy */}
          <p className="sr-only">
            6th Media Studio offers professional media services in Legazpi City, Albay,
            including photography, videography, event coverage, branding content, and
            digital storytelling. We focus on capturing memories, milestones, and
            creative projects for individuals and businesses.
          </p>
        </div>
      </div>
    </section>
  );
}
