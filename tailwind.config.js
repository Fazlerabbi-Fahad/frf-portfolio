/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0B0F",
        raised: "#12141B",
        ash: "#8A8F9C",
        bone: "#ECECEE",
        electric: "#3D7BFF",
        ember: "#FF7849",
        cyan: "#46E0D2",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: { tightest: "-0.035em" },
      keyframes: {
        lift: { from: { transform: "translateY(110%)" }, to: { transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
