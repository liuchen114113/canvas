/**
 * 配置导航
 */
export default [
  {
    path: '/canvas',
    icon: 'unordered-list',
    title: 'canvas',
    children: [
      {
        path: '/canvas-size',
        title: '画布大小'
      },
      {
        path: '/canvas-image',
        title: '使用图片'
      },
      {
        path: '/canvas-translate',
        title: '转换'
      },
      {
        path: '/canvas-video',
        title: '加载视频'
      }
    ]
  }
]
