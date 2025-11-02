import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // TypeScript 타입 체크 비활성화
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint 검사 비활성화
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
