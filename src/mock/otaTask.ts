export default {
  '/api/v1/ota-task': {
    get: {
      enabled: true,
      response: {
        code: '0',
        data: {
          list: [
            {
              id: '1290d9ff-d9c6-49a6-9806-77c21d419832',
              createdTime: '2019-06-10 12:41:31',
              status: 'running'
            },
            {
              id: '2290d9ff-d9c6-49a6-9806-77c21d419832',
              createdTime: '2019-06-10 12:41:31',
              status: 'fail'
            },
            {
              id: '3290d9ff-d9c6-49a6-9806-77c21d419832',
              createdTime: '2019-06-10 12:41:31',
              status: 'success'
            },
            {
              id: '4290d9ff-d9c6-49a6-9806-77c21d419832',
              createdTime: '2019-06-10 12:41:31',
              status: 'init'
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
