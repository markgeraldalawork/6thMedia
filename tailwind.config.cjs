/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#ff7a00',
        },
      },
      height: {
        90: "22.5rem", // h-90
      },
      translate: {
        "101": "101%",
      },

      keyframes: {
        smoothBounce: {
          "0%, 100%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(12px) scale(0.9)",
            opacity: "0.6",
          },
        },

        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },

        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-50%)" },
        },
      },

      animation: {
        smoothBounce: "smoothBounce 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn: "fadeIn 0.3s ease-out",
        marquee: "marquee 15s linear infinite",
      },
    },
  },
  plugins: [],
};
