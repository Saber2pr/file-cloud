const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanCSSPlugin = require("less-plugin-clean-css")
const path = require("path")
const webpack = require("webpack")
const extractLess = new ExtractTextPlugin("style.min.css")

const { WebpackConfig, templateContent } = require("@saber2pr/webpack-configer")

const getLocalIP = require("./server/getIP")

module.exports = WebpackConfig({
  entry: "./src/app.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  output: {
    filename: "bundle.min.js",
    path: path.join(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"]
      },
      {
        test: /\.(css|less)$/,
        use: extractLess.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader",
              options: {
                plugins: [
                  new CleanCSSPlugin({
                    advanced: true
                  })
                ]
              }
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(woff|svg|eot|ttf)$/,
        use: ["url-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: templateContent("文件中转站", {
        injectBody: '<div id="root"></div>'
      })
    }),
    extractLess,
    new webpack.BannerPlugin({
      banner: `var ipv4="${getLocalIP()}";`,
      raw: true,
      test: /\.js/
    })
  ]
})
