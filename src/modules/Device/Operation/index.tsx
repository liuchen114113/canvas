import React from 'react'

import { DEVICE_TYPE } from '../constants'
import Passengerflow from './Passengerflow'
import Recognition from './Recognition'
import Snapshot from './Snapshot'
import './index.less'

const Operation = props => {
  switch (props.device.deviceType) {
    case DEVICE_TYPE.PASSENGERFLOW:
      return <Passengerflow {...props} />
    case DEVICE_TYPE.RECOGNITION:
      return <Recognition {...props} />
    case DEVICE_TYPE.SNAPSHOT:
      return <Snapshot {...props} />
  }
}

export default Operation
