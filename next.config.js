const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/learn-software-testing-with-claude-code' : '',
  assetPrefix: isProd ? '/learn-software-testing-with-claude-code/' : '',
  images: { unoptimized: true },
  trailingSlash: true,
}

module.exports = nextConfig
