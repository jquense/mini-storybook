module.exports = {
  content: [
    `${__dirname}/app/*.js`,
    `${__dirname}/../stores/**/*.{js,jsx,html,css,vue,svelte,ts,tsx}`,

    // Point to your source files if you are also authoring using tailwind
    // "./src/**/*.{js,jsx,html,css,vue,svelte,ts,tsx}",
  ],

  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
