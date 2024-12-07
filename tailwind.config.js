import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

function addVariablesForColors({ addBase, theme }) {
  // 사용자 정의 색상 + 기본 색상 병합
  const allColors = flattenColorPalette(theme("colors"));
  const customVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  // :root에 CSS 변수 추가
  addBase({
    ":root": customVars,
  });
}

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        primary_text: "#212121",
        secondary_text: "#757575",
        error_text: "#ff2400",
        primary_color: "#2196f3",
        light_primary_color: "#bbdefb",
        dark_primary_color: "#1976d2",
        divider: "#bdbdbd",
        folder_color: "#ebc351",
        primary_brown: "#fcefef",
      },
    },
  },
  plugins: [addVariablesForColors],
};

export default config;