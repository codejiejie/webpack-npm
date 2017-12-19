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