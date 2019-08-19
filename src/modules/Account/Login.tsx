import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import { IRootState, Dispatch } from '@/store'
import { passwordRules, emailRules } from '@/config/constants'

const FormItem = Form.Item

const mapState = (state: IRootState) => ({
  isLogin: state.account.isLogin,
  loading: state.loading.effects.account.asyncLogin
})

const mapDispatch = (dispatch: Dispatch) => ({
  login: dispatch.account.asyncLogin
})

interface ILoginProps
  extends FormComponentProps,
    RouteComponentProps,
    Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

class Login extends Component<ILoginProps, any> {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.login(values)
      }
    })
  }

  componentDidUpdate() {
    if (this.props.isLogin) {
      message.success('登录成功，欢迎回来')
      this.props.history.push('/')
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
          <div style={{ height: '65px' }} />
          <FormItem>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={this.props.loading}
            >
              登录
            </Button>
          </FormItem>
        </Form>
        <Link to="/register">没有账号，立即注册</Link>
      </>
    )
  }
}

export default Form.create<ILoginProps>()(
  connect(
    mapState,
    mapDispatch
  )(withRouter(Login))
)
