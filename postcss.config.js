module.exports = {
  plugins: [
    require('postcss-smart-import')(),
    require('postcss-color-function')(),
    require('precss')(),
    require('autoprefixer')(),
  ]
}
