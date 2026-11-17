import type { NextConfig } from "next";

// `npm run export` sets STATIC_EXPORT=1 to produce a plain static site in /out
// (any static host works). A normal `npm run build` targets Vercel/Node hosting
// with full image optimisation.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export", trailingSlash: true } : {}),
  images: {
    unoptimized: isStatic,
    remotePatterns: [
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
