/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      primary_text: '#212121',
      secondary_text: '#757575',
      error_text: '#ff2400',
      primary_color: '#2196f3',
      light_primary_color: '#bbdefb',
      dark_primary_color: '#1976d2',
      divider: '#bdbdbd',
      folder_color: '#ebc351'
    }
  },
  plugins: [],
}

