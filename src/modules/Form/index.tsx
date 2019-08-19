import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'
import { FormFactory, FormTypes } from '@horizon/dawn-ui'
import { FormComponentProps } from 'antd/lib/form'

import { Dispatch, IRootState } from '@/store'
import './index.less'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

// 此处放外部需要传递进来的 props 属性
interface IFormSampleProps
  extends FormComponentProps,
    Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

// 此处映射 model 里面的 state 到 props 上
const mapState = (state: IRootState) => ({
  loading: state.loading.effects.form.asyncSubmit
})

// 此处映射 model 里面的方法(effects, reducers)到 props 上
const mapDispatch = (dispatch: Dispatch) => ({
  submit: dispatch.form.asyncSubmit
})

class FormSample extends Component<IFormSampleProps, null> {
  config: any[]

  constructor(props) {
    super(props)
    this.config = [
      {
        type: FormTypes.Input,
        label: '姓名',
        key: 'name',
        placeholder: '请输入姓名',
        rules: [
          {
            min: 3,
            required: true
          }
        ]
      },
      {
        type: FormTypes.RadioButton,
        label: '性别',
        key: 'sex',
        initialValue: 'male',
        options: [
          {
            label: '男',
            value: 'male'
          },
          {
            value: 'female',
            label: '女'
          }
        ]
      },
      {
        type: FormTypes.Select,
        label: '地址',
        key: 'country',
        initialValue: 'China',
        options: [
          {
            label: '中国',
            value: 'China'
          },
          {
            label: '美国',
            value: 'America'
          }
        ]
      },
      {
        label: '身份',
        key: 'role',
        type: FormTypes.Radio,
        options: [
          {
            label: '会员',
            value: 'citizen'
          },
          {
            label: '访客',
            value: 'visitor'
          }
        ]
      },
      {
        type: FormTypes.Checkbox,
        key: 'task',
        label: '处理事项',
        options: [
          {
            label: '访客',
            value: 'visit'
          },
          {
            label: '移民',
            value: 'migrate'
          }
        ]
      },
      {
        type: FormTypes.DatePicker,
        key: 'date',
        label: '日期',
        placeholder: '选择日期'
      },
      {
        type: FormTypes.TimePicker,
        key: 'time',
        label: '时间',
        placeholder: '选择时间'
      },
      {
        type: FormTypes.TextArea,
        label: '备注',
        key: 'description',
        placeholder: '请留言'
      },
      {
        type: FormTypes.Slider,
        label: '满意度',
        key: 'satisfaction',
        formProps: {
          min: 0,
          max: 10
        }
      },
      {
        type: FormTypes.Switch,
        label: '接收通知',
        key: 'notification',
        formProps: {
          checkedChildren: '接收',
          unCheckedChildren: '不收'
        }
      },
      {
        type: FormTypes.Rate,
        label: '重要度',
        key: 'importance',
        formProps: {
          count: 5
        }
      }
    ]
  }

  submit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        console.log('receive form values:', values)
        this.props.submit(values)
      }
    })
  }

  render() {
    return (
      <div className="form">
        <FormFactory
          config={this.config}
          form={this.props.form}
          formItemLayout={formItemLayout}
        />
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            onClick={this.submit}
            loading={this.props.loading}
          >
            提交
          </Button>
        </Form.Item>
      </div>
    )
  }
}

export default Form.create<IFormSampleProps>()(
  connect(
    mapState,
    mapDispatch
  )(FormSample)
)
