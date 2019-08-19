import React from 'react'
import { Button, Form } from 'antd'

import { DEVICE_TYPE } from '../constants'
import Passengerflow from './Passengerflow'
import Recognition from './Recognition'
import Snapshot from './Snapshot'

import './index.less'
import { FormComponentProps } from 'antd/lib/form'

interface IParams extends FormComponentProps {
  handler: any
  deviceType: DEVICE_TYPE
}

const Params = (props: IParams) => {
  const handlerConfigParams = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        // TODO: 补充实际的调参处理逻辑
        console.log(values, '>>>>')
        props.handler.hide()
      }
    })
  }

  // 渲染部分逻辑
  let whichComponent = null
  switch (props.deviceType) {
    case DEVICE_TYPE.PASSENGERFLOW:
      whichComponent = <Passengerflow {...props} />
      break
    case DEVICE_TYPE.RECOGNITION:
      whichComponent = <Recognition {...props} />
      break
    case DEVICE_TYPE.SNAPSHOT:
      whichComponent = <Snapshot {...props} />
      break
  }

  return (
    <div className="device-params">
      <h3>调参</h3>
      {whichComponent}
      <div className="device-footer">
        <Button onClick={props.handler.hide}>取消</Button>
        <Button type="primary" onClick={handlerConfigParams}>
          确定
        </Button>
      </div>
    </div>
  )
}

export default Form.create<any>()(Params)
