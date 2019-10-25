const path = require('path')
// 拼接路径
function resolve (dir) {
  return path.join(__dirname, dir)
}
const name = 'XXX-平台' // page title
// const port = 9527 // api port
module.exports = {
  // publicPath: process.env.VUE_APP_BASE_URL,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 静态资源 (js、css、img、fonts) 目录 (相对于 outputDir 的)
  assetsDir: 'assets',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath: 'index.html',
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: true,
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右
  runtimeCompiler: false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    host: 'localhost',
    port: 2333, // 端口号
    https: false,
    open: false, // 配置自动启动浏览器
    overlay: {
      // 是否让浏览器 overlay 显示警告和错误
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://192.168.10.132:5005`,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: process.env.VUE_APP_BASE_API
        }
      },
      '/api': {
        // target: 'http://172.16.3.15:5005',
        // target: 'http://172.16.3.80:5005',
        target: 'http://192.168.10.3:5005',
        // target: 'http://192.168.10.3:8761/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    historyApiFallback: true
  },
  // 它支持webPack-dev-server的所有选项
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@http': resolve('src/utils/http'),
        '@api': resolve('src/api'),
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  // 别名设置
  css: {
    loaderOptions: {}
  },
  // 预加载器设置
  chainWebpack: (config) => {
    // config.module
    //   .rule('svg')
    //   .exclude.add(path.resolve(__dirname, 'src/icons'))
    //   .end()
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(path.resolve(__dirname, 'src/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end()
  }
}
