import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = bundleAnalyzer({

  async rewrites() {
    return [
      {
        source: '/api/register',
        destination: 'https://paybridge.pythonanywhere.com/api/auth/register/',
      },
    ];
  },
});

export default nextConfig;

