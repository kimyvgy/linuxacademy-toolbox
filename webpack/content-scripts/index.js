const { resolve } = require('path')

module.exports = {
  mode: process.env.NODE_ENV,

  name: 'content-scripts',

  entry: [
    './src/content-scripts/detect-transcript.ts',
  ],

  output: {
    path: resolve(__dirname, '../../dist'),
    filename: 'content-scripts.js',
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': resolve(__dirname, '../../src'),
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
          configFile: resolve(__dirname, '../content-scripts/tsconfig.json'),
        }
      },
    ]
  },
}
