import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Form, Button } from 'antd'
import { FormFactory, FormTypes } from '@horizon/dawn-ui'

import './index.less'
import { FormComponentProps } from 'antd/lib/form'

interface IUpdate extends FormComponentProps, RouteComponentProps {
  handler: any
}

const Update = (props: IUpdate) => {
  const handleUpdate = () => {
    props.form.validateFields((err, values) => {
      console.log(values, '<<<<<<<<')
      if (!err) {
        props.handler.hide()
        props.history.push('/device/task')
      }
    })
  }

  const config = [
    {
      type: FormTypes.Select,
      label: 'OTA版本',
      key: 'ota',
      options: [
        {
          label: 'OTA版本1',
          value: 'version1'
        },
        {
          label: 'OTA版本2',
          value: 'version2'
        }
      ],
      rules: [
        {
          required: true,
          message: '请选择要升级的ota版本'
        }
      ]
    }
  ]

  return (
    <div className="device-update">
      <FormFactory config={config} form={props.form} />
      <div className="update-footer">
        <Button onClick={props.handler.hide}>取消</Button>
        <Button type="primary" onClick={handleUpdate}>
          确定
        </Button>
      </div>
    </div>
  )
}

export default Form.create<any>()(withRouter(Update))
