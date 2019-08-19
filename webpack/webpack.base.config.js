const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const commonConfig = {
  entry: {
    app: [path.join(__dirname, '../src/index.tsx')]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: [
          'babel-loader?cacheDirectory=true',
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|eot|ogv|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh-cn/),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: path.join(__dirname, '../src/assets/images/favicon.png'),
      template: path.join(__dirname, '../src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true
      }
    }),

    new webpack.HashedModuleIdsPlugin(),

    new StyleLintPlugin({
      context: 'src',
      files: '**/*.less',
      syntax: 'less'
    })
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, '../src'),
      '@tests': path.join(__dirname, '../tests')
    }
  }
}

if (process.env.npm_config_analyse) {
  commonConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = commonConfig
