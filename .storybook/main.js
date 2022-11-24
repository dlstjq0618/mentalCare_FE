const path = require("path");

module.exports = {
  stories: ["../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, "../"),
      path.resolve(__dirname, "../node_modules"),
    ];
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "~": path.resolve(__dirname, ".."),
    };
    return config;
  },
};
