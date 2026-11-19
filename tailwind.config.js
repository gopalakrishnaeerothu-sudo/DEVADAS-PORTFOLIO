/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050507",
        foreground: "#F5F5F5",
        brand: {
          red: "#FF0000",
          crimson: "#E60000",
          glow: "rgba(255, 0, 0, 0.45)",
          ice: "#E0F1F1",
          slate: "#BCD6DB",
          white: "#F5F5F5",
          obsidian: "#050507",
          glass: "#17171b",
        },
        charcoal: {
          DEFAULT: "#17171b",
          50: "#242730",
          100: "#1C1E26",
          200: "#17171b",
          300: "#121317",
          400: "#0D0E12",
          900: "#050507",
        },
        cinematic: {
          orange: "#FF0000", // Updated to vibrant signature red
          amber: "#FF2A2A",
          red: "#FF0000",
          glow: "rgba(255, 0, 0, 0.4)",
        },
        glass: {
          surface: "rgba(23, 23, 27, 0.78)",
          border: "rgba(224, 241, 241, 0.15)",
          ice: "#E0F1F1",
          slate: "#BCD6DB",
          red: "#FF0000",
          lavender: "#BCD6DB",
          green: "#36d67e",
          hover: "rgba(255, 255, 255, 0.14)",
        },
        muted: {
          text: "#BCD6DB",
          dark: "#4A5560",
        }
      },
      fontFamily: {
        sans: ["var(--font-sora)", "Sora", "-apple-system", "sans-serif"],
        display: ["var(--font-sora)", "Sora", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
