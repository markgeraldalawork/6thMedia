import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Intro({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone?.();
    }, 2600); // matches your animation duration
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "1rem",
          boxSizing: "border-box",
          flexDirection: "column",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "5vw" }} // relative spacing
          animate={{ opacity: 1, letterSpacing: "1vw" }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            whiteSpace: "nowrap",
            fontSize: "6vw", // font scales with viewport width
            fontWeight: 300,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          6th Media Studio
        </motion.h1>
                {/* Underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }} // adjust underline width
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{
            height: "3px",
            backgroundColor: "white",
            borderRadius: "2px",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
