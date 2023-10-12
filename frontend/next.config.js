/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.pexels.com'],
    },
    env: {
        UserPoolId: process.env.UserPoolId,
        ClientId: process.env.ClientId,
        APIGatewayURL: process.env.APIGatewayURL,
    },
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 // Allow for specific domains to have access or * for all
    //                 {
    //                     key: "Access-Control-Allow-Origin",
    //                     value: "*",
    //                     // DOES NOT WORK
    //                     // value: process.env.ALLOWED_ORIGIN,
    //                 },
    //                 // Allows for specific methods accepted
    //                 {
    //                     key: "Access-Control-Allow-Methods",
    //                     value: "GET, POST, PUT, DELETE, OPTIONS",
    //                 },
    //                 // Allows for specific headers accepted (These are a few standard ones)
    //                 {
    //                     key: "Access-Control-Allow-Headers",
    //                     value: "Content-Type, Authorization",
    //                 },
    //             ],
    //         },
    //     ]
    // }
}

module.exports = nextConfig