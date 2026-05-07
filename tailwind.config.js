/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sky-top': '#2D2A4A',
        'sky-horizon': '#FF8A5B',
        'sun-core': '#FFD56B',
        'grass': '#6BAA75',
        'grass-light': '#8FCB8B',
        'stone': '#C4B8A8',
        'phone-booth': '#E63946',
        'ui-glass': 'rgba(20, 24, 36, 0.55)',
        'ui-text': '#FFF8EC',
        'accent-glow': '#A8E6CF',
        'midnight': '#0F1B2D',
      },
      fontFamily: {
        display: ['"Bagel Fat One"', 'Impact', 'cursive'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
