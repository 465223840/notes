const {
  resolve
} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  // module: {
  //   rules: {}
  // },
  devtool: 'source-map',
  resolve: {
    //先去根目录找。如果没有再去node_modules文件夹去找
    modules: [resolve(__dirname, ''), resolve(__dirname, 'node_modules')]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: resolve(__dirname, 'public/index.html')
    })
  ]
}