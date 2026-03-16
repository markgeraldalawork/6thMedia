import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Intro({ onDone }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onDone?.();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 2 }}
        className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-[9999]"
      >

        {/* Studio Name */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "1.5rem", y: 40 }}
          animate={{ opacity: 1, letterSpacing: "0.3rem", y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-white text-[6vw] font-light tracking-widest text-center"
        >
          6th Media Studio
        </motion.h1>

        {/* Underline animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
          className="origin-left h-[2px] bg-white mt-6 w-[220px]"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="text-gray-300 mt-6 tracking-[0.4em] text-xs uppercase"
        >
          Photography • Film • Creative
        </motion.p>

      </motion.div>
    </AnimatePresence>
  );
}