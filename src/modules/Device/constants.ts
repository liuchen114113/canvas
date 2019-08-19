export enum DEVICE_TYPE {
  PASSENGERFLOW = 'passengerflow',
  RECOGNITION = 'recognition',
  SNAPSHOT = 'snapshot',
  ALL = 'all'
}

export const DEVICE_TYPES = [
  {
    VALUE: DEVICE_TYPE.ALL,
    LABEL: '全部'
  },
  {
    VALUE: DEVICE_TYPE.PASSENGERFLOW,
    LABEL: '客流机'
  },
  {
    VALUE: DEVICE_TYPE.RECOGNITION,
    LABEL: '识别机'
  },
  {
    VALUE: DEVICE_TYPE.SNAPSHOT,
    LABEL: '抓拍机'
  }
]
