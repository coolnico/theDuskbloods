/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: false },
      { source: '/en/:path*', destination: '/:path*', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        // 全局边缘缓存：HTML 页面 24 小时，SWR 7 天
        // 静态资源（_next/static、*.svg）带内容哈希，文件名变即路径变，自然 cache miss 重拉
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

// Set up Cloudflare bindings in local development (e.g. R2, KV, D1).
import('@opennextjs/cloudflare').then(({ initOpenNextCloudflareForDev }) =>
  initOpenNextCloudflareForDev(),
);

module.exports = withNextIntl(nextConfig);
