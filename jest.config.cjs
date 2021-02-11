module.exports = {
  transform: {
    "\\.js$": "./jest-esbuild.cjs",
  },
  preset: "jest-playwright-preset",
};
