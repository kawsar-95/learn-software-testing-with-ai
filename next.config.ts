import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Static export served from "/": no basePath, no assetPrefix.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Plugins are given by name: Turbopack passes the options to Rust, so they
// must be serializable. remark-gfm keeps the GFM tables that Nextra enabled
// by default.
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [["remark-gfm"]],
    rehypePlugins: [["rehype-slug"], ["@shikijs/rehype", { theme: "github-dark-dimmed", addLanguageClass: true }]],
  },
});

export default withMDX(nextConfig);
