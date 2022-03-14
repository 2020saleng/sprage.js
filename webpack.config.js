let path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    "Sprage.min": "./app.ts",
    Sprage: "./app.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/, //表示node_modules中的tsx文件不做处理
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    globalObject: "this",
    library: "Sprage",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  mode: "none", //因为自带的只能指定一种环境，所以我们直接关闭，利用插件实现
  optimization: {
    //这个字段很强大，我们做webpack的代码分割，摇数，tree shake等都会用到这个字段
    minimize: true, //开启插件
    minimizer: [
      new TerserPlugin({
        test: /\.min.js/, //提供一个正则，表示符合有min.js的就进行压缩
      }),
    ],
  },
};
