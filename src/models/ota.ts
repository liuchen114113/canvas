import { createModel } from '@rematch/core'

import * as services from '../services'

export const ota = createModel({
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
      const result = await services.ota.list(payload)
      dispatch.ota.updateState(result)
    }
  })
})
