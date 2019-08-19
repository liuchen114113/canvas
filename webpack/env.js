module.exports = {
  development: {
    mock: true, // 是否开启 mock，修改后需要重新运行 npm run dev
    devServer: {
      // devServer 设置，透传给 webpack
      port: 8000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://apistore.hobot.cc/mock/209',
          secure: false,
          changeOrigin: true
        },
        '/dms': {
          //target: 'https://dms.horizon.ai/dms/v1/driver_behavior',
          target: 'http://10.10.108.117:9500',
          secure: false,
          changeOrigin: true,
          headers: {
            Host: '0.0.0.0'
          }
        }
      }
    }
  },
  production: {
    mock: true // 是否开启 mock，开启后 api 请求直接本地 mock 生成，不走 nginx 转发
  }
}
