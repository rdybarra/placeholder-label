// webpack.config.js
module.exports = {
  entry: './src/main.js',
  output: {
    filename: './build/main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
