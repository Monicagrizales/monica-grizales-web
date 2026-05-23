import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        malva: {
          50: "#f6f3f8",
          100: "#eddfe9",
          200: "#dac9ed", // Tu color lavanda claro
          300: "#c2add7",
          400: "#aa91c1",
          500: "#9667ad", // Tu color violeta principal
          600: "#7e5294",
          700: "#663f7a",
          800: "#4f2d5e",
          900: "#381c44",
        },
        ciruela: {
          50: "#fff6f0",
          100: "#ffedd3",
          200: "#f2d1ae", // Tu color arena/naranja suave
          300: "#fd9139", // Tu naranja medio
          400: "#f28042",
          500: "#e86f38", // Tu naranja principal
          600: "#cc5a25",
          700: "#a14318",
          800: "#752e0e",
          900: "#4a1b05",
        },
        arena: {
          50: "#faf9f8",
          100: "#f5f2ee",
          200: "#ebe7e1",
          300: "#ded9d0",
          400: "#c7bfb4",
          500: "#aba195",
          600: "#8c8276",
          700: "#70675c",
          800: "#544d45",
          900: "#3b3630",
        },
        humo: {
          50: "#f7f7f8",
          100: "#eeeff1",
          200: "#d8dadf",
          300: "#b5b9c3",
          400: "#8d93a1",
          500: "#6c7281",
          600: "#545967",
          700: "#404450",
          800: "#2a2d36",
          900: "#171921", // Texto oscuro principal
        },
      },
      fontFamily: {
        // Configuramos tu tipografía "YDYoonche UL". Si el navegador aún no la encuentra, usará "Inter" temporalmente.
        sans: ["var(--font-yoonche)", "YDYoonche UL", "var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-soft":
          "linear-gradient(135deg, #f6f3f8 0%, #fff6f0 50%, #f5f2ee 100%)", // Tu nuevo degradado suave
      },
    },
  },
  plugins: [],
};

export default config;
