const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }

      }
    },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']}),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
