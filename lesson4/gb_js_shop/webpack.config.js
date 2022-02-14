const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "production",

    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
          title: 'GeekBrains Shop JS2',
          template: path.resolve(__dirname, './public/template.html'), // шаблон
          filename: 'index.html', // название выходного файла
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
      proxy: {
        '/api/v1': 'http://localhost:3000',
      },
    }
}