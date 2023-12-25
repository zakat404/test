const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: (pathdata) => {
      const filepath = path
        .dirname(pathdata.filename)
        .split('/')
        .slice(1)
        .join('/');
      return `${filepath}/[name].[hash][ext][query]`;
    },
  },
  devServer: {
    open: true,
    host: 'localhost',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin({
      logo: './src/images/logo.svg',
      mode: 'webapp',
      devMode: 'webapp',
      favicons: {
        appName: 'wakeapp',
        appDescription: 'WakeApp test task',
        developerName: 'Mike Kopytin',
        developerURL: null,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
