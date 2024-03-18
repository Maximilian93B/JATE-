// Import Plugins and utils
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      main: './src/js/index.js', // Main entry point
      install: './src/js/install.js' // Entry point for installation script
    },
    output: {
      filename: '[name].bundle.js', // Output bundle file name
      path: path.resolve(__dirname, 'dist'), // Output path
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Path to the html template 
        title: 'JATE', // title
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A text editor that goes where you go!',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', // credential policy 
        icons: [
          {
            src: path.resolve('./src/images/logo.png'), // path to icons. 
            sizes: [96, 128, 192, 256, 384, 512], // icons sizes 
            destination: path.join( 'assets','icons'), // dest folder for icons 
          },
        ],
      }),
      // inject service worker 
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'service-worker.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/, // match all css files 
          use: ['style-loader', 'css-loader'], // use loaders 
        },
        {
          test: /\.js$/, // match all js files es
          exclude: /node_modules/, // no node_modules please 
          use: {
            loader: 'babel-loader', // use babel loaders 
            options: {
              presets: ['@babel/preset-env'], 
              plugins: ['@babel/plugin-transform-runtime'], // async await plugin
            },
          },
        },
      ],
    },
  };
};
