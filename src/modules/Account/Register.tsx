import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import { IRootState, Dispatch } from '@/store'
import { emailRules, passwordRules } from '@/config/constants'

const FormItem = Form.Item

const mapState = (state: IRootState) => ({
  isRegister: state.account.isRegister,
  loading: state.loading.effects.account.asyncRegister
})

const mapDispatch = (dispatch: Dispatch) => ({
  register: dispatch.account.asyncRegister
})

interface IRegisterProps
  extends FormComponentProps,
    RouteComponentProps,
    Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

class Register extends Component<IRegisterProps, any> {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        delete values.repeatPassword
        this.props.register(values)
      }
    })
  }

  handleConfirmPassword = (_rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致')
    }
    callback()
  }

  componentDidUpdate() {
    if (this.props.isRegister) {
      message.success('注册成功,请登录')
      this.props.history.push('/login')
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <>
        <Form onSubmit={this.handleSubmit} style={{ width: '340px' }}>
          <FormItem>
            {getFieldDecorator('username', { rules: emailRules })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="请输入邮箱"
                size="large"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', { rules: passwordRules })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="请输入密码"
                size="large"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('repeatPassword', {
              rules: [
                {
                  required: true,
                  message: '请再次输入以确认新密码'
                },
                { validator: this.handleConfirmPassword }
              ]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="重复密码"
                size="large"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={this.props.loading}
            >
              注册
            </Button>
          </FormItem>
        </Form>
        <Link to="/login">已有账号，立即登录</Link>
      </>
    )
  }
}

export default Form.create<IRegisterProps>()(
  connect(
    mapState,
    mapDispatch
  )(withRouter(Register))
)
