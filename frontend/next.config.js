module.exports = {
   // webpack: (config, { isServer }) => {
   //    // Fixes packages that depend on fs/module module
   //    if (!isServer) {
   //       config.node = { fs: 'empty', module: 'empty' }
   //    }

   //    return config
   // },
   images: {
      domains: ['res.cloudinary.com'],
   },
   future: {
      webpack5: true,
   },
}
