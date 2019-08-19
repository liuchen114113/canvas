import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Icon, Menu, Dropdown, Layout } from 'antd'
import { Dispatch, IRootState } from '@/store'
import './index.less'

const { Header } = Layout

interface IHeaderBarProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

const mapState = (state: IRootState) => ({
  collapsed: state.main.collapsed
})

const mapDispatch = (dispatch: Dispatch) => ({
  toggleCollapsed: dispatch.main.toggleCollapsed
})

class HeaderBar extends PureComponent<IHeaderBarProps, null> {
  handleCollapse = () => {
    this.props.toggleCollapsed()
  }

  clickMenu = ({ key }) => {
    if (key === '1') {
      // cookie.remove('user')
      window.location.href = '/login'
    }
  }

  render() {
    return (
      <Header
        className="header-wrapper"
        style={{
          width: `calc(100% - ${this.props.collapsed ? '80px' : '250px'})`
        }}
      >
        <div className="left-menu">
          <div className="collapse-wrapper">
            <Icon
              className="trigger"
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.handleCollapse}
            />
          </div>
        </div>
        <div className="right-menu">
          <div className="account">
            <Dropdown
              overlay={
                <Menu onClick={this.clickMenu}>
                  <Menu.Item key="1">退出登录</Menu.Item>
                </Menu>
              }
              trigger={['click', 'hover']}
            >
              <span>
                <Icon
                  type="user"
                  style={{ fontSize: '16px', paddingRight: '10px' }}
                />
                admin <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        </div>
      </Header>
    )
  }
}

export default connect(
  mapState,
  mapDispatch
)(HeaderBar)
