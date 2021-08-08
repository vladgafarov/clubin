// const { withPlaiceholder } = require('@plaiceholder/next')

module.exports = {
   // future: { webpack5: true },
   // webpack: config => {
   //    // Unset client-side javascript that only works server-side
   //    config.resolve.fallback = {
   //       fs: false,
   //       module: false,
   //       // os: false,
   //       // path: false,
   //    }

   //    return config
   // },
   // webpack5: true,
   // webpack: config => {
   //    config.resolve.fallback = { fs: false, module: false, path: false }

   //    return config
   // },
   // webpack: (config, { isServer }) => {
   //    // Fixes packages that depend on fs/module module
   //    if (!isServer) {
   //       config.node = { fs: 'empty', module: 'empty' }
   //    }

   //    return config
   // },

   //    config.module.rules.push(
   //       {
   //          test: /\.(png|jpg|gif)$/i,
   //          use: [
   //             {
   //                loader: 'url-loader',
   //                options: {
   //                   limit: 8192,
   //                },
   //             },
   //          ],
   //       },
   //       {
   //          test: /\.(png|jpg|jpeg|gif|ico|svg|webp)$/,
   //          loader: 'file-loader',
   //       }
   //    )

   //    return config
   // },
   images: {
      domains: ['res.cloudinary.com'],
   },
   future: {
      webpack5: true,
   },
}
