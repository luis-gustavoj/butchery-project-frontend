const withReactSvg = require("next-react-svg");
const path = require("path");

/** @type {import('next').NextConfig} */

const nextConfig = withReactSvg({
  reactStrictMode: true,
  include: path.resolve(__dirname, "src/assets/svg"),
  redirects: async () => [
    {
      source: "/gerenciamento",
      destination: "/gerenciamento/dashboard",
      permanent: true,
    },
  ],
  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === "object")
      .oneOf.filter((rule) => Array.isArray(rule.use));

    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (/css-loader[/\\](?:cjs|dist|src)/.test(moduleLoader.loader)) {
          if (typeof moduleLoader.options.modules === "object") {
            moduleLoader.options.modules = {
              ...moduleLoader.options.modules,
              exportLocalsConvention: "camelCaseOnly",
            };
          }
        }
      });
    });

    return config;
  },
});

module.exports = nextConfig;
