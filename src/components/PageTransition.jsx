import { motion } from "framer-motion";
import React, { useState } from "react";

export default function PageTransition({ children }) {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <>
      {showOverlay && (
        <motion.div
          className="transition-overlay"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 5 }}
          onAnimationComplete={() => setShowOverlay(false)} // remove overlay
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "red",
            zIndex: 9998,
          }}
        />
      )}
      {children}
    </>
  );
}
