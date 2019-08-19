import React from 'react'
import { Button, ButtonTypes } from '@horizon/dawn-ui'

const Snapshot = () => {
  return (
    <div className="device-operation">
      <Button type={ButtonTypes.borderless}>画域</Button>
      <Button type={ButtonTypes.borderless}>重启</Button>
      <Button type={ButtonTypes.borderless}>删除</Button>
    </div>
  )
}

export default Snapshot
