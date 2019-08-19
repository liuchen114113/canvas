import { createModel } from '@rematch/core'

import * as services from '../services'

export const device = createModel({
  state: {
    list: [],
    pagination: {
      total: 0,
      current: 0,
      pageSize: 15
    }
  },

  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload
      }
    }
  },

  effects: dispatch => ({
    async asyncList(payload) {
      const result = await services.device.list(payload)
      dispatch.device.updateState(result)
    },

    async config({ deviceId, ...params }) {
      await services.device.config(
        {
          deviceId
        },
        params
      )
    }
  })
})
