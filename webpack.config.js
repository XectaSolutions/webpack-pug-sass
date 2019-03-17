const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const replaceExt = require("replace-ext");
const projectConfig = require("./project.config");
const devMode = process.env.NODE_ENV !== "production";

console.log("Build Mode = ", process.env.NODE_ENV);

const minimizer = [];
if (projectConfig.minifyJS) {
  minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    })
  );
}

if (projectConfig.minifyCSS) {
  minimizer.push(new OptimizeCSSAssetsPlugin({}));
}

const plugins = [];

//clean
if (!devMode) {
  plugins.push(new CleanWebpackPlugin([projectConfig.buildPath]));
}

//HMR
//plugins.push(new webpack.HotModuleReplacementPlugin());

plugins.push(
  new MiniCssExtractPlugin({
    path: path.join(__dirname, "dist/css"),
    filename: devMode ? "[name].css" : "[name].[hash].css",
    chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
  })
);

if (Array.isArray(projectConfig.templateFiles)) {
  for (let i = 0; i < projectConfig.templateFiles.length; i++) {
    let templateFile = projectConfig.templateFiles[i];
    plugins.push(
      new HtmlWebPackPlugin({
        template: templateFile,
        filename: replaceExt(path.basename(templateFile), ".html")
      })
    );
  }
}

module.exports = {
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name].js"
  },
  optimization: {
    minimizer: minimizer
  },
  devServer: {
    contentBase: projectConfig.buildPath,
    openPage: projectConfig.homePage ? projectConfig.homePage : "index.html"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: projectConfig.minifyHTML }
          }
        ]
      },
      {
        test: /\.(pug|jade)/i,
        use: [
          {
            loader: "html-loader",
            options: { minimize: projectConfig.minifyHTML }
          },
          "pug-html-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          false ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },

  plugins: plugins
};
