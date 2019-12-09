const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const manifest = require('../../templates/manifest.json')
const pkg = require('../../package.json')

module.exports = {
  mode: process.env.NODE_ENV,

  name: 'background-scripts',

  entry: [
    './src/background-scripts/subtitle.ts',
  ],

  output: {
    path: resolve(__dirname, '../../dist'),
    filename: 'background-scripts.js',
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': resolve(__dirname, '../../src')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: resolve(__dirname, './tsconfig.json'),
        }
      },
    ]
  },

  plugins: [
    new CopyPlugin([
      {
        from: './templates/manifest.json',
        to: 'manifest.json',
        transform: () => {
          manifest.version = pkg.version

          return Buffer(JSON.stringify(manifest, null, 2))
        }
      },
      {
        from: './static',
        to: 'static',
      }
    ])
  ]
}
