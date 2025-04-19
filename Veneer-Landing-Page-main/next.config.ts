import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
};

export default nextConfig;
