import { createModel } from '@rematch/core'

import * as services from '../services'

export const drive = createModel({
  state: {
    rawData: {},
    personNum: 0,
    personInfo: []
  },

  reducers: {
    // 在这里写纯函数来改变 state

    updateState(state, payload) {
      return {
        ...state,
        ...payload
      }
    }
  },

  effects: dispatch => ({
    // 在这里写"不纯"的函数，比如 ajax 请求获取数据
    // 异步请求必须放在此处

    async asyncDriveBehavior(payload) {
      dispatch.drive.updateState({
        personNum: 0,
        personInfo: []
      })
      const result = await services.drive.driveBehavior(payload)
      dispatch.drive.updateState(result)
    }
  })
})
