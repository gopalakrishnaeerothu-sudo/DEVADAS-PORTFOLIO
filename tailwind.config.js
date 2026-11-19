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
        background: "#08090D",
        foreground: "#F5F3EF",
        charcoal: {
          DEFAULT: "#15171D",
          50: "#22252E",
          100: "#1A1D24",
          200: "#15171D",
          300: "#101116",
          400: "#0C0D11",
          900: "#08090D",
        },
        cinematic: {
          orange: "#FF6B35",
          amber: "#FF9F1C",
          red: "#E63946",
          glow: "rgba(255, 107, 53, 0.35)",
        },
        glass: {
          surface: "rgba(23, 23, 27, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
          lavender: "#b9abff",
          green: "#36d67e",
          hover: "rgba(255, 255, 255, 0.12)",
        },
        muted: {
          text: "#92949D",
          dark: "#4B4E5A",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "Sora", "system-ui", "sans-serif"],
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
