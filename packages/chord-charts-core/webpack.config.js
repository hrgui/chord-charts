module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname,
    filename: 'dist/chord-charts.js',
    libraryTarget: 'umd',
    library: 'chord-charts'
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
}
