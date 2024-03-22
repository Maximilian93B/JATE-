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
      main: '/src/js/index.js',
      install: '/src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js', // Use contenthash for cache busting
      path: path.resolve(__dirname, 'dist'),
      clean: true, // Clean the output directory on every build
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Path to your template file
        title: 'JATE', // The title to use for the generated HTML document
      }),
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "A text editor that goes where you go!",
        background_color: "#ffffff",
        crossorigin: "use-credentials",
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: 'icons',
          },
        ],
        start_url: '/',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
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
  
    // Development server configuration
    devServer: {
      static: path.join(__dirname, 'dist'),
     // compress: true,
     // port: 9000,
      hot: true,
     // open: true,
     // client: {
       // overlay: true,
      },
     /*proxy: {
        '/api': 'http://localhost:3000', // Proxy API requests to the backend server
      },
    },*/
    // Performance hints
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
