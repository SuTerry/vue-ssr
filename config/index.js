const path = require('path')

module.exports = {
  production: {
    env: "production",
    port: 3000,
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../dist"),
  },
  preproduction: {
    env: "preproduction",
    port: 3000,
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../static"),
  },
  testing: {
    env: "testing",
    port: 3000,
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../static"),
  },
  development: {
    env: "development",
    port: 3000,
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../static"),
  },
  server: {
    env: "server",
    port: 3000,
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../dist"),
  }
}