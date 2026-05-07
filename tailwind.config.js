/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunset-coral': 'var(--sunset-coral)',
        'afternoon-gold': 'var(--afternoon-gold)',
        'deep-teal': 'var(--deep-teal)',
        'midnight-ink': 'var(--midnight-ink)',
        'viral-red': 'var(--viral-red)',
        'mint-highlight': 'var(--mint-highlight)',
        'cream-paper': 'var(--cream-paper)',
        charcoal: 'var(--charcoal)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-bagel)', 'cursive'],
      },
    },
  },
  plugins: [],
}
