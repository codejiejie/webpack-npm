const path=require("path");
let htmlWebpackPlugin=require("html-webpack-plugin");

module.exports={
    entry:"./src/app.js",
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:"js/[name].bundle.js"

    },
    module:{
        rules:[
            {
                test: /\.js$/,

                loader: "babel-loader",
                include:path.resolve(__dirname,"./src"),
                exclude:path.resolve(__dirname,"node_modules"),
                query:{
                    presets:["env"]
                }
            },
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options:{
                            plugins:[
                                require("postcss-import"),
                                require("autoprefixer")
                            ],
                            browser:["last 2 versions"]
                        }
                    }

                ]
            },
            {
                test:/\.html$/,
                use:[
                    {loader:"html-loader"}
                ]
            },
            {
                test:/\.tpl$/,
                use:[
                    {loader:"ejs-loader"}
                ]
            },
            {
                test:/\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {
                        loader: "postcss-loader",
                        options:{
                            plugins:[
                                require("postcss-import"),
                                require("autoprefixer")
                            ],
                            browser:["last 2 versions"]
                        }
                    },
                    {loader: "less-loader"}
                    ]
            },
            {
                test:/\.(png|jpg|gif|svg|)$/,
                use: [
                    {
                        loader: "url-loader",
                        options:{
                            limit:200,
                            name:"assets/[name]-[hash:5].[ext]"
                        }

                    }

                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:"index.html",
            template:"index.html",
            inject:"body",
            title:"webpack a"

        })
    ],
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
};
