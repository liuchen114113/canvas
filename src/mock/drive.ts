export default {
  '/dms/v1/driver_behavior': {
    post: {
      enabled: false, // 是否开启
      response: {
        // mock 规则
        code: '0',
        message: '',
        data: {
          person_num: 1,
          'person_info|1-1': [
            {
              location: {
                frame_id: 1,
                left: 1,
                top: 1,
                right: 1,
                bottom: 1
              },
              attributes: {
                smoke: {
                  // 吸烟
                  score: 10,
                  threshold: 10
                },
                cellphone: {
                  // 使用手机
                  score: 10,
                  threshold: 10
                },
                fatigue: {
                  // 疲劳驾驶
                  score: 10,
                  threshold: 10
                },
                not_facing_front: {
                  // 左顾右盼
                  score: 10,
                  threshold: 10
                }
              }
            }
          ]
        }
      }
    }
  }
}
