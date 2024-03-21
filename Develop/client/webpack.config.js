// Import Plugins and utils
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const webpack = require('webpack'); // Ensure webpack is imported

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js', // Use contenthash for cache busting
      path: path.resolve(__dirname, 'dist'),
      clean: true, // Clean the output directory on every build
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'JATE',
      }),
      new WebpackPwaManifest({
        Name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A text editor that goes where you go!',
        background_color: '#ffffff',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'), // Ensure this points to the icon file
            sizes: [96, 128, 192, 256, 384, 512], // Define sizes as needed
            destination: path.join('icons'),
          },
        ],
        start_url: '/'
      }),
      
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      //  ignore modules not intended for browser environments
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
      ],
    },
    // Provide fallbacks for Node.js modules not available in the browser
    resolve: {
      fallback: {
        "worker_threads": false, // Fallback for worker_threads
        "child_process": false, // Add fallbacks as needed
      },
    },
    // Development server configuration
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      hot: true,
      open: true,
      client: {
        overlay: true,
      },
    },
    // Performance hints
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
