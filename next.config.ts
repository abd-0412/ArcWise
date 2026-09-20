import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['172.24.204.216', 'localhost', '127.0.0.1'],
};

export default withPWA(nextConfig);
