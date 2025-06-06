// next.config.mjs

const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const domain = new URL(url).hostname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [domain],
  },
};

export default nextConfig; // ✅ bonne syntaxe pour .mjs
