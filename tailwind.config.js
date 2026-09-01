/** @type {import('tailwindcss').Config} */

// Tailwind's default opacity scale only defines multiples of 5 (5, 10, ...,
// 100), so the bare `/NN` modifier shorthand used all over this codebase
// (text-white/58, text-white/73, text-white/81, etc.) was silently failing
// to compile for every non-multiple-of-5 value — Tailwind just drops
// unknown utilities instead of erroring. The practical effect: nearly all
// "dimmed" text across the site was rendering at full white opacity, which
// is why everything looked like the same color. Filling in every integer
// 0–100 makes every `/NN` opacity modifier already used in the markup
// actually generate a rule.
const FULL_OPACITY_SCALE = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [String(i), (i / 100).toString()])
)

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      opacity: FULL_OPACITY_SCALE,
      fontFamily: {
        mono: ['"Space Mono"', '"Courier New"', 'monospace'],
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // Warm ember accent — echoes the character's goggle glow. Used for
        // section eyebrow labels and links only, so it reads as a distinct
        // hierarchy tier against the mostly-white/gray body copy instead of
        // everything sharing one shade of white.
        ember: {
          DEFAULT: "#e0924f",
          bright: "#f2a869",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scan-line": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(100vh)" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
          "75%": { opacity: "0.95" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "music-bar": {
          "0%, 100%": { height: "3px" },
          "50%": { height: "10px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "scan-line": "scan-line 8s linear infinite",
        "flicker": "flicker 4s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
        "music-bar": "music-bar 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
