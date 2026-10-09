import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// The GitHub Pages workflow sets this to "/<repo-name>"; local builds serve from "/".
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    // Client code that does not go through next/link (fetch) adds it itself.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
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
