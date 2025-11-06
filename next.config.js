import path from 'node:path'
import { fileURLToPath } from 'node:url'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  output: 'export',
  staticPageGenerationTimeout: 600,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' }
    ],
    formats: ['image/webp'],
    dangerouslyAllowSVG: true
  },
  webpack: (config) => {
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    config.resolve.alias.react = path.resolve(dirname, 'node_modules/react')
    config.resolve.alias['react-dom'] = path.resolve(dirname, 'node_modules/react-dom')
    return config
  },
  transpilePackages: ['react-tweet'],
  env: {
    NOTION_DISABLE_CACHE: 'true'
  }
})

export default nextConfig
