# webpack-npm
webpack命令行操作及其原理

#win7总结下可能报错的原因
 1、安装webpack的时候，命令为npm install webpack -g --save-dev     解决webpack不是内部命令的报错 
 2、webpack hello.js hello.bundle.js --module-bind "css=style-loader!css-loader" 

# loader
css-loader 是为了让webpack能够处理.css后缀的文件  
style-loader 是将css-loader处理后的文件 在html文件中新建style标签  插入到页面的heade标签中
#使用命令行 绑定模板
--module-bind "css=style-loader!css-loader"  此处必须用双引号  在require的时候 每次loader麻烦 所以 直接使用它
--watch  如果做了修改 每次执行命令行 webpack hello.js hello.bundle.js --module-bind "css=style-loader!css-loader"  麻烦  所以使用--watch 来自动打包
--progress 用来看到打包过程
--display-modules  会将打包的所有模块列出来  并且把用什么loader处理也会列出来
--display-reasons  写出原因  为什么打包这个模块

-----------------------------------------
# 配置webpack.config.js
* 在命令行中，直接webpack  会自动执行webpack.config.js 
* 如果指定了其它配置文件   webpack --config webpack.xxx.config.js
* 可以在node的packjson中指定   webpack 的 多个命令行参数  "webpack":"webpack --config webpack.config.js --progress --display-modules --colors --display-reasons"
* path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。
到绝对路径就停止，如果没有解析到绝对路径或者path长度为0，返回当前工作路径
* 在webpack新版本中 output的path必须是绝对路径
# entry 
* 单个字符串 "./src/script/main.js"   添加多种依赖
* 数组 ["./src/script/main.js","./src/script/a.js"] 两个文件属于平行关系不互相依赖打包到一起  只对应一个输出文件时，会合并到同一个文件  都被视为单个的输入
* 对象   key chunkname  value    在多页面中使用   在新版本的webpack中  不能给一个输出文件里打包  需要使用[name] 
> 通过多个入口点，代码拆分或各种插件创建多个包时，使用output占位  （写到一个会被覆盖）
```
  {
         main:"./src/script/main.js",    
         a:"./src/script/a.js"
    }
```
# output
* filename

> [name]key Chunk Names [hash] 打包第一行 本次打包hash [chunkhash]  文件中的hash值是不一样的 和这次 打包的hash值也是不一样的   可以认为是这个文件的版本号 也可以认为是md5值  保证文件的唯一性  只有当这个文件改变时 值才会改变   在上线时很有用 [id] chunk值  模块id 

* publicPath  "/asset/" => http://localhost:63342/asset/js/main-0.js  会放到服务器下的根路径中的asset文件夹中

# 采用插件的原因
如果用hash打包 每次都不确定，在index.html中引用很麻烦，这里采用插件
html-webpack-plugin
```
context:""  //整个运行环境的上下文    默认为运行这个脚本的目录     因为此脚本一般在根目录下运行
 plugins:[
        //可以传参  参数是一个{}
        new htmlWebpackPlugin({
                filename:"index.html" //指定生成的filename
                template:"index.html" //路径 与上下文有关  
                inject:"head"  //指定生成的js引用是放在 头部还是body标签中  false 不生成
                minify: {       // 压缩代码
                        removeComments: true, // 删除注释
                        collapseWhitespace: true // 删除空格
                 }
        })
        
    ]
```
直接使用，会生成index.html  并将入口文件打包生成的js引入
* 1、插件生成的index.html与自动生成的js关联起来   （通过实例化插件  即可完成）
* 2、根目录下的初始化定义好的index.html文件与插件生成的关联  （以根目录下的index.html为模板生成dist目录下的index.html   template可以实现   这时已经可以不再模板中指定src路径  让其自动生成）
* 3、plugin生成的文件是根据output中path指定的，所有生成的文件都在dist/js目录下  需要重新设置output  path与filename
* 4、在插件中传参 在模板中引用   支持ejs模板引擎  在模板中htmlWebpackPlugin.options.title
在htmlWebpackPlugin中有files、options两个key
files更多的是与entry相关 通过这个可以修改模板中的js在头部还是body 
￼
options更多是与其插件自身配置相关  里面有所有的参数
* 5、对文件进行压缩 使用到
# 处理多页面应用
通过再次调用插件，来达到生成多个页面的应用   
* 1、直接调用时，每次页面中的引用都是一样的  
* 2、要想给每个页面单独定义  需要设置chunks这个项 chunks:["a"]
* 3、 当一个页面中所包含的的chunks多得时候，单独使用chunks这个项就会很麻烦 使用另一个项excludeChunks :[]  忽略哪几项之外的所有 
# 将初始化的脚本直接嵌入页面 而不是引用页面的方法 来提供最佳性能
以in_line的形式  compilation.assets  webpack自身的一个引用