// Generated using webpack-cli https://github.com/webpack/webpack-cli

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


//----------此插件可以清除注释,console,debugger以及指定不需要的内容--------
const TerserWebpackPlugin = require('terser-webpack-plugin')

//---------借助插件DIY设定devtool的详细配置-----------
// webpack.sourceMapDevToolPlugin 可以配合 FileManagerPlugin管理生成后的map文件


// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')  //实现PWA渐进式网络开发

const ZipWebpackPlugin = require('zip-webpack-plugin')


const proconfig = {
    mode: 'production',
    optimization: {  // 优化配置项  实现前提是 ES Modules-------------需修改babel-loader---------
    //     concatenateModules: true,    // 尽可能合并每一个模块到一个函数中  减少体积和运行效率
        minimizer: [   //  把未引用的块剔除掉     压缩
        new TerserWebpackPlugin({//--------------详细配置----------https://github.com/terser/terser
            extractComments: false,      //  不生成LICENSE文件(提取注释)
            // minify: TerserWebpackPlugin.uglifyJsMinify,   //集 JavaScript 解析器，压缩器，美化器于一身
            terserOptions: {
                // minify: {

                // },
                format: {
                  comments: false,//删除所有注释
                //   ecma: 6,   //期待输出的es版本

                },
                compress: {
                  drop_console: true, // 移除所有console.log
                },
                // mangle: {
                //     eval: true, //是否允许使用eval
                // }
              },
        }),
        // new CssMinimizerPlugin()   //  minify the output
        ]     
    },
    //------此处定义可以结合merge整合,避免相同键覆写-------
    plugins: [
        new CleanWebpackPlugin(),   // 自动清除之前的打包目录  插件
        new CopyWebpackPlugin({  //实现静态文件的直接复制
            patterns: [             // 需要拷贝的目录或者路径
            {from: 'public/logo.png', to: './logo.png'},
            {from: 'public/manifestPro.json', to: './manifest.json'}
        ]}),
        // new OptimizeCssAssetsWebpackPlugin()
        // new RemoveConsolePlugin()
        // new CompressionWebpackPlugin() //压缩指定文件生成压缩包
        new ZipWebpackPlugin(  //打包文件夹自动输出压缩包文件
           {
            filename: 'xzz.zip',
            pathPrefix: 'xzz2023/'
            // extension: 'zip',
            // fileOptions: {
            //     mtime: new Date(),
            //     mode: 0o100664,
            //     compress: true,
            //     forceZip64Format: false,
            //   },
           }
        ),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
            // minimizerOptions: {
            //     preset: [
            //       "default",
            //       {
            //         discardComments: { removeAll: true },
            //       },
            //     ],
            //   },
        }),
        //可以定义全局上下文的变量
        new webpack.DefinePlugin({
            // 此处解决vue未定义extension大量报错问题
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
            "AUTHOR": JSON.stringify('user'),
            "VERSION": JSON.stringify('0928'),
            'DEBUG': false
          }),

    ],
    module: {  
        rules: [
            {
                oneOf:[
                    {// **目前是style标签分别注入,且未压缩,需优化压缩整合到同一标签下,若整体css大于150K需再调整成link方式按需引入
                        test: /\.css$/i,
                        use: [MiniCssExtractPlugin.loader,'css-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
                        // sideEffects: true
                        // use: ["style-loader", 'css-loader'],  
                    },
                    //此处可以引入移动端自适应px2rem-loader
                    {
                        test: /\.s[ac]ss$/i,
                        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
                        // sideEffects: true
                        // use: ["style-loader", 'css-loader','sass-loader'], 
                    }
                ]
            },
        ],
    },
    // externals: {}, //在生产模式引入指定模块外链cdn的情况下,忽略指定的模块不进行打包

}

module.exports = proconfig
