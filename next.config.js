/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  optimizeFonts: false,
};

// ref: https://uiwjs.github.io/react-md-editor/#support-nextjs
const removeImports = require("next-remove-imports")();

module.exports = removeImports(nextConfig);
