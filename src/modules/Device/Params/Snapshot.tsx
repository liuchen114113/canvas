import React from 'react'
import { FormFactory, FormTypes } from '@horizon/dawn-ui'

const config = [
  {
    type: FormTypes.InputNumber,
    label: '灵敏度',
    key: 'field1',
    rules: [
      {
        type: 'integer',
        min: 1,
        max: 10,
        message: '请输入 [1-10] 正整数'
      }
    ],
    formProps: {}
  },
  {
    type: FormTypes.InputNumber,
    label: '目标抓拍时间（s）',
    key: 'field2',
    rules: [
      {
        type: 'integer',
        min: 0,
        message: '请输入正整数'
      }
    ]
  },
  {
    type: FormTypes.RadioButton,
    label: '是否抓拍',
    key: 'field3',
    options: [
      {
        label: '是',
        value: true
      },
      {
        label: '否',
        value: false
      }
    ]
  },
  {
    type: FormTypes.InputNumber,
    label: '再次抓取时间差',
    key: 'field4',
    rules: [
      {
        type: 'integer',
        message: '请输入正整数',
        min: 0
      }
    ]
  },
  {
    type: FormTypes.InputNumber,
    label: '抓拍图片数 (1-3）',
    key: 'field5',
    rules: [
      {
        type: 'integer',
        message: '请输入 [1-3] 的整数',
        min: 1,
        max: 3
      }
    ]
  },
  {
    type: FormTypes.InputNumber,
    label: '抓拍阈值（1-10）',
    key: 'field6',
    rules: [
      {
        type: 'integer',
        min: 1,
        max: 10,
        message: '请输入 [1-10] 的整数'
      }
    ]
  },
  {
    type: FormTypes.InputNumber,
    label: '人脸外扩系数 (1.0-4.0）',
    key: 'field7',
    rules: [
      {
        type: 'number',
        message: '请输入 [1.0-4.0] 的一位小数',
        min: 1,
        max: 4
      }
    ],
    formProps: {
      precision: 1
    }
  },
  {
    type: FormTypes.InputNumber,
    label: '抓拍最小人脸尺寸（32-256）',
    key: 'field8',
    rules: [
      {
        type: 'integer',
        message: '请输入 [32-256] 的整数',
        min: 32,
        max: 256
      }
    ]
  }
]

const Snapshot = props => {
  return <FormFactory config={config} form={props.form} />
}

export default Snapshot
