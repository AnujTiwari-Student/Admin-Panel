/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "letsenhance.io",
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
  