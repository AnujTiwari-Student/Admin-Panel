/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cloudinary.com",
        },
        {
          protocol: "https",
          hostname: "example.com",
        },
        {
          protocol: "https",
          hostname: "linkedinclone.blob.core.windows.net",
        },
      ],
    },
  };
  
  export default nextConfig;
  