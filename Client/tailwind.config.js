/* eslint-disable no-undef */
const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
      "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements/js/**/*.js",
      "./node_modules/flowbite/**/*.js",
      flowbite.content(),
      "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    ],
    theme: {
      extend: {
        fontFamily:{
          nunito :['Nunito','sans-serif'],
          Quicksand:["Quicksand", 'sans-serif'] // Removed the comma here
        },
        colors: {
          ...colors,
        }
      },
    },
    darkMode: "class",
    plugins: [require("tw-elements/plugin.cjs"),flowbite.plugin(),require('flowbite/plugin')({
      charts: true,
  }),]
  });