export default {
  '/api/v1/ota': {
    get: {
      enabled: true,
      response: {
        code: '0',
        data: {
          list: [
            {
              id: '1290d9ff-d9c6-49a6-9806-77c21d419832',
              deviceType: 'passengerflow',
              file: 'url',
              version: 'HR-IPC2263-21B-v1.2.5-RECOG-20190626',
              description: '识别327筒机v1.2.5-0626',
              createdTime: '2019-06-10 12:41:31'
            },
            {
              id: '2290d9ff-d9c6-49a6-9806-77c21d419832',
              deviceType: 'recognition',
              file: 'url',
              version: 'DR-IPC2263-21B-v1.2.5-RECOG-20190626',
              description: '识别327筒机v1.2.5-0626',
              createdTime: '2019-06-10 12:41:31'
            },
            {
              id: '3290d9ff-d9c6-49a6-9806-77c21d419832',
              deviceType: 'snapshot',
              file: 'url',
              version: 'VR-IPC2263-21B-v1.2.5-RECOG-20190626',
              description: '识别327筒机v1.2.5-0626',
              createdTime: '2019-06-10 12:41:31'
            },
            {
              id: '4290d9ff-d9c6-49a6-9806-77c21d419832',
              deviceType: 'passengerflow',
              file: 'url',
              version: 'Rkkkku2263-21B-v1.2.5-RECOG-20190626',
              description: '识别327筒机v1.2.5-0626',
              createdTime: '2019-06-10 12:41:31'
            }
          ],
          pagination: {
            current: 0,
            total: 4
          }
        }
      }
    }
  }
}
