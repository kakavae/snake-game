const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    // environment: {
    //     arrowFunction: false // 关闭webpack的箭头函数，可选
    // }
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  // module: {
  //   rules: [
  //       {
  //           test: /\.ts$/,
  //           use: {
  //              loader: "ts-loader"     
  //           },
  //           exclude: /node_modules/
  //       }
  //   ]
  // },
  module: {
    // 指定要加载的规则
    rules: [
        // 1.设置ts文件的处理
        {
            // test指定的是规则生效的文件--会编译的文件
            test: /\.ts$/,
            // 要使用的loader
            use: [
                 // 配置babel
                 {
                     // 指定加载器
                     loader:"babel-loader",
                     // 设置babel
                     options: {
                         // 设置预定义的环境
                         presets:[
                             [
                                 // 指定环境的插件
                                 "@babel/preset-env",
                                 // 配置信息
                                 {
                                     // 要兼容的目标浏览器
                                     targets:{
                                         "chrome":"58",
                                         "ie":"11"
                                     },
                                     // 指定corejs的版本
                                     "corejs":"3",
                                     // 使用corejs的方式 "usage" 表示按需加载
                                     "useBuiltIns":"usage"
                                 }
                             ]
                         ]
                     }
                 },
                'ts-loader'
            ],
            // 要排除的文件
            exclude: /node-modules/
        },
        // 2. 设置less文件的处理
        {
          test: /\.less$/,
          use:[
            "style-loader",
            "css-loader",
            // 引入postcss
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins:[
                    [
                      "postcss-preset-env",
                      {
                        browsers: 'last 2 versions'
                      }
                    ]
                  ]
                }
              }
            },
            "less-loader"
          ]
        }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        // title:'TS测试'
        template: "./src/index.html"
    }),
  ],
  devServer: {
    open: true,
    host: "localhost"
    // port: 8081
  }
}