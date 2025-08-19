/** @type {import('tailwindcss').Config} */
module.exports = {
  // Updated content paths for NativeWind (all app and component files)
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./styles/global.css"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}