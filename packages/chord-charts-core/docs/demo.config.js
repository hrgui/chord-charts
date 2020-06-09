module.exports = {
  entry: './docs/demo.ts',
  output: {
    path: __dirname,
    filename: 'demo.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  devServer: {
    contentBase: './docs'
  },
  mode: 'development'
}
