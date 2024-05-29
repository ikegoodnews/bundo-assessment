/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,

   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/i,
         issuer: /\.[jt]sx?$/,
         use: ['@svgr/webpack'],
      });

      return config;
   },
   images: {
      domains: ['ui-avatars.com'],
      dangerouslyAllowSVG: true,
   },

   //  transpilePackages: ['date-fns'],

   async headers() {
      return [
         {
            // Routes this applies to
            source: '/api/(.*)',
            // Headers
            headers: [
               // Allow for specific domains to have access or * for all
               {
                  key: 'Access-Control-Allow-Origin',
                  value: '*',
                  // DOES NOT WORK
                  // value: process.env.ALLOWED_ORIGIN,
               },
               {
                  key: 'Access-Control-Allow-Credentials',
                  value: 'true',
               },
               // Allows for specific methods accepted
               {
                  key: 'Access-Control-Allow-Methods',
                  value: 'GET, POST, PUT, DELETE, OPTIONS',
               },
               // Allows for specific headers accepted (These are a few standard ones)
               {
                  key: 'Access-Control-Allow-Headers',
                  value: 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
               },
            ],
         },
      ];
   },
};

export default nextConfig;
