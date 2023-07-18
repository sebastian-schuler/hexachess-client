/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '1-auto-1': '1fr auto 1fr',
      },
      colors: {
        primary: {
          50: '#F3FCFB',
          100: '#B2EAE4',
          200: '#7CDCD0',
          300: '#4FD0C0',
          400: '#32BCAC',

          500: '#2A9D8F',

          600: '#227E72',
          700: '#1B645C',
          800: '#165049',
          900: '#11403B',
          950: '#0E332F',
        },
        dark: {
          50: '#99C0D0',
          100: '#70A7BD',
          200: '#4F91AC',
          300: '#42798F',
          400: '#376578',
          500: '#2E5464',
          600: '#264653',
          700: '#1E3842',
          800: '#182D35',
          900: '#13242A',
          950: '#101D22',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

