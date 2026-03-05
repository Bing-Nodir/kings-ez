/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy:   { DEFAULT: "#0A1628", "2": "#0F1F3D", light: "#1E293B" },
        teal:   { DEFAULT: "#00BCD4", light: "#00E5FF", dark: "#0097A7" },
        gold:   { DEFAULT: "#F5A623", light: "#FFD166", dark: "#E09112" },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body:    ["DM Sans", "sans-serif"],
        mono:    ["Space Mono", "monospace"],
      },
      animation: {
        "fade-up":    "fadeUp .6s ease both",
        "fade-in":    "fadeIn .4s ease both",
        "float":      "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp:    { from: { opacity: 0, transform: "translateY(24px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseGlow: { "0%,100%": { boxShadow: "0 0 20px rgba(0,188,212,.3)" }, "50%": { boxShadow: "0 0 50px rgba(0,188,212,.7)" } },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0,188,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,188,212,.04) 1px,transparent 1px)",
      },
    },
  },
  plugins: [],
};
