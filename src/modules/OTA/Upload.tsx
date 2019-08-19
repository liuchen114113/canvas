import React from 'react'
import { Form, Button } from 'antd'
import { DEVICE_TYPES } from '../Device/constants'
import { FormFactory, FormTypes } from '@horizon/dawn-ui'

import './Upload.less'

const config = [
  {
    type: FormTypes.Upload,
    label: '文件上传',
    key: 'field1',
    uploadRender: <Button icon="upload">上传文件</Button>,
    rules: [
      {
        required: true,
        message: '请上传相应的升级文件'
      }
    ]
  },
  {
    type: FormTypes.Select,
    label: '类型',
    key: 'field2',
    rules: [
      {
        required: true,
        message: '请选择相应的类型'
      }
    ],
    options: DEVICE_TYPES.slice(1).map(o => {
      return {
        value: o.VALUE,
        label: o.LABEL
      }
    })
  },
  {
    type: FormTypes.TextArea,
    label: 'OTA版本名称',
    key: 'field3',
    rules: [
      {
        maxLength: 40,
        message: '不能超过40个字符'
      }
    ]
  },
  {
    type: FormTypes.TextArea,
    label: '升级更新说明',
    key: 'field4',
    rules: [
      {
        maxLength: 50,
        message: '不能超过50个字符'
      }
    ]
  }
]

const Upload = props => {
  const handleUpload = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values, '<<<<<<<<')
        props.handler.hide()
      }
    })
  }

  return (
    <div className="ota-upload">
      <h3>上传升级包</h3>
      <FormFactory config={config} form={props.form} />
      <div className="ota-footer">
        <Button onClick={props.handler.hide}>取消</Button>
        <Button type="primary" onClick={handleUpload}>
          确定
        </Button>
      </div>
    </div>
  )
}

export default Form.create<any>()(Upload)
