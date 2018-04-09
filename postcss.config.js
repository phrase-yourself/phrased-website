const resolve = (id) => process.cwd() + id

module.exports = {
  plugins: [
    require('postcss-import')({resolve: resolve, path: ','}),
    require('postcss-cssnext')()
  ]
}
