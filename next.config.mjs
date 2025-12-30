/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dropbox が .next をロックする問題を避けるため
  // プロジェクト直下の別ディレクトリに出力
  distDir: ".next-cache",

  reactStrictMode: false,
};

export default nextConfig;
