const path = require('path')

module.exports = {
  production: {
    env: "production",
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../dist"),
  },
  preproduction: {
    env: "preproduction",
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../static"),
  },
  testing: {
    env: "testing",
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../static"),
  },
  development: {
    env: "development",
    publicPath: "/static/",
    outPath: path.resolve(__dirname, "../static"),
  },
  server: {
    env: "server",
    port: 3000,
    publicPath: "http://127.0.0.1:3000/static/",
    outPath: path.resolve(__dirname, "../dist"),
  }
}