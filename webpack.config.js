const path = require('path')
module.exports = {
  entry: {
    bundle: './src/index.ts',
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'docs'),
    open: true,
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
      },
    ],
  },
}
