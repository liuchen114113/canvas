import { request } from '@/services/request'
import { ERROR_CODE } from '@/config/errors'

const api = {
  list: {
    url: '/api/v1/ota-task',
    method: 'get'
  }
}

export const otaTask = {
  async list(data) {
    let result = {
      list: [],
      pagination: {
        ...data.pagination
      }
    }

    const response: any = await request(api.list, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = {
        ...response.data
      }
    }
    result.pagination = {
      ...data.pagination,
      ...result.pagination
    }

    return result
  }
}
