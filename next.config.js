const path = require('path')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  webpack(config, { isServer } ) {

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  }

};
