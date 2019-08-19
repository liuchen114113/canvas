import { createModel } from '@rematch/core'

import * as services from '../services'

export const otaTask = createModel({
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

  effects: () => ({
    async asyncList(payload) {
      const result = await services.otaTask.list(payload)
      this.updateState(result)
    }
  })
})
