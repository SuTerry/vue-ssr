module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      modules: false,
      corejs: 3,
      targets: {
        ie: 10
      }
    }],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-runtime',
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}