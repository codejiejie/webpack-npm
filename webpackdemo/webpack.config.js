const path=require("path");
let htmlWebpackPlugin=require("html-webpack-plugin");
module.exports={
    entry:{
        main:"./src/script/main.js",
        a:"./src/script/a.js",
        b:"./src/script/b.js",
        c:"./src/script/c.js",
    },
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:"js/[name]-[id].js",
        publicPath:"http://codejiejie.com"
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:"a.html",
            template:"index.html",
            inject:false,
            title:"webpack a",
            excludeChunks:["b","c"]
        }),
        new htmlWebpackPlugin({
            filename:"b.html",
            template:"index.html",
            inject:false,
            title:"webpack b",
            excludeChunks:["a","c"]
        }),
        new htmlWebpackPlugin({
            filename:"c.html",
            template:"index.html",
            inject:false,
            title:"webpack c",
            excludeChunks:["b","a"]

        })
    ]
};
