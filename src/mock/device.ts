export default {
  '/api/v1/device': {
    get: {
      enabled: true,
      response: {
        code: '0',
        data: {
          list: [
            {
              ip: '127.0.0.1',
              id: '1290d9ff-d9c6-49a6-9806-77c21d419832',
              sn: '068B3001010110163L',
              previewUrl: '@image(80x50)',
              manufacture: 'HeroSpeed',
              model: 'ipc',
              runningStatus: 0,
              position: '海龙',
              ota: 'HR-IPC2XX5-X1B-v1.2.5-FLOW-RECOG-20190622',
              recentHeart: '2019-07-16T16:14:03.589+08:00',
              createdTime: '2019-06-10 12:41:31',
              deviceType: 'passengerflow'
            },
            {
              ip: '127.0.0.2',
              id: '2290d9ff-d9c6-49a6-9806-77c21d419831',
              sn: '068B3001010110163W',
              previewUrl: '@image(80x50)',
              manufacture: 'HeroSpeed',
              model: 'ipc',
              runningStatus: 1,
              position: '台湾',
              ota: 'HR-IPC2XX5-X1B-v1.2.5-FLOW-RECOG-20190622',
              recentHeart: '2019-07-16T16:14:03.589+08:00',
              createdTime: '2019-06-10 12:41:31',
              deviceType: 'recognition'
            },
            {
              ip: '127.0.0.1',
              id: '3290d9ff-d9c6-49a6-9806-77c21d419833',
              sn: '068B3001010110163R',
              previewUrl: '@image(80x50)',
              manufacture: 'HeroSpeed',
              model: 'ipc',
              runningStatus: 1,
              position: '青岛',
              ota: 'HR-IPC2XX5-X1B-v1.2.5-FLOW-RECOG-20190622',
              recentHeart: '2019-07-16T16:14:03.589+08:00',
              createdTime: '2019-06-10 12:41:31',
              deviceType: 'passengerflow'
            },
            {
              ip: '127.0.0.1',
              id: '4290d9ff-d9c6-49a6-9806-77c21d419833',
              sn: '068B3001010110163Q',
              previewUrl: '@image(80x50)',
              manufacture: 'HeroSpeed',
              model: 'ipc',
              runningStatus: 0,
              position: 'xxxx',
              ota: 'HR-IPC2XX5-X1B-v1.2.5-FLOW-RECOG-20190622',
              recentHeart: '2019-07-16T16:14:03.589+08:00',
              createdTime: '2019-06-10 12:41:31',
              deviceType: 'snapshot'
            }
          ],
          pagination: {
            current: 0,
            total: 4
          }
        }
      }
    }
  },
  '/api/v1/device/:deviceId': {
    post: {
      enable: true,
      response: {
        code: '0',
        data: {}
      }
    }
  }
}
