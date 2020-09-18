const path = require('path');

let config = {
  viewsDir: path.join(__dirname, '../views'),
  staticDir: path.join(__dirname, '../assets')
};

if (process.env.NODE_ENV === 'dev') {
  const devConfig = {
    port: 3000,
    cache: false
  }
  config = { ...config, ...devConfig };
}

if (process.env.NODE_ENV === 'prod') {
  const devConfig = {
    port: 80,
    cache: 'memory'
  }
  config = { ...config, ...devConfig };
}

module.exports = config;