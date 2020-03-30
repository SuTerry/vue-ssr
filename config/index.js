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
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../dist"),
  },
  testing: {
    env: "testing",
    port: 3000,
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../dist"),
  },
  development: {
    env: "development",
    port: 3000,
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../dist"),
  },
  server: {
    env: "server",
    port: 3000,
    publicPath: "http://127.0.0.1:3000/static/",
    outPath: path.resolve(__dirname, "../dist"),
  }
}