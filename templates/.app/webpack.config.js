const path = require("path");
const { plugins, rules, loaders } =
  require("mini-storybook/webpack/utils").createAtoms({
    disableMiniExtractInDev: false,
  });

const tailwindConfig = require.resolve("../tailwind.config.js");

module.exports = {
  devtool: "inline-cheap-module-source-map",
  entry: require.resolve("./index.js"),
  output: {
    publicPath: "/",
    path: `${__dirname}/stories/build`,
  },
  module: {
    rules: [
      rules.js({
        // Delete this if you want to use our own project babel config
        presets: ["mini-storybook/babel-preset"],
      }),
      rules.postcss({
        postcssOptions: {
          plugins: require("mini-storybook/postcss")(tailwindConfig),
        },
      }),
      rules.sass(),
      rules.images(),
      rules.fonts(),
      rules.audioVideo(),
    ],
  },
  plugins: [plugins.html(), plugins.extractCSS()],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".tsx", ".json"],
  },
  devServer: {
    historyApiFallback: true,
  },
};
