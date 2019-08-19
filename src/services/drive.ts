import { request } from '@/services/request'
import { ERROR_CODE } from '@/config/errors'
import { IResponse } from '@/schemas/common'

const api = {
  driveBehavior: {
    url: '/dms/v1/driver_behavior',
    method: 'post'
  }
}

export const drive = {
  async driveBehavior(data) {
    let result = {
      rawData: {},
      personNum: 0,
      personInfo: []
    }
    const response: IResponse = await request(api.driveBehavior, data)
    if (response && `${response.code}` === ERROR_CODE.SUCCESS) {
      result = {
        ...response.data,
        rawData: response
      }
      console.log(result)
    }

    return result
  }
}
