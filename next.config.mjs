import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,  // 禁用图片优化，允许从所有来源加载图片
  },
};

export default withNextIntl(nextConfig);