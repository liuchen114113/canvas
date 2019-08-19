import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { IRootState, Dispatch } from '@/store'
import { Table, Select, Spin, Button } from 'antd'
import {
  Modal,
  Button as HorizonButton,
  ButtonTypes as HorizonButtonTypes
} from '@horizon/dawn-ui'
import moment from 'moment'

import Upload from './Upload'

import { DEVICE_TYPE, DEVICE_TYPES } from '../Device/constants'

import './index.less'

const Option = Select.Option

const mapState = (state: IRootState) => ({
  loading: state.loading.effects.ota.asyncList,
  otaList: state.ota.list,
  otaListPagination: state.ota.pagination
})

const mapDispatch = (dispatch: Dispatch) => ({
  getOTAList: dispatch.ota.asyncList
})

// 设备信息模型定义
export interface IOTA {
  id: string
  deviceType: DEVICE_TYPE
  file: string
  version: string
  description: string
  createdTime: string
}

interface IDeviceProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

// 定义设备列表展现字段形态
const columns = [
  {
    title: 'OTA版本',
    dataIndex: 'version',
    width: 500
  },
  {
    title: '类型',
    key: 'deviceType',
    render: record => {
      switch (record.deviceType) {
        case DEVICE_TYPE.PASSENGERFLOW:
          return '客流机'
        case DEVICE_TYPE.RECOGNITION:
          return '识别机'
        case DEVICE_TYPE.SNAPSHOT:
          return '抓拍机'
      }
      return '-'
    },
    width: 80
  },

  {
    title: '上传时间',
    key: 'createdTime',
    render: record => {
      if (record.createdTime) {
        return moment(record.createdTime).format('YYYY-MM-DD HH:mm:ss')
      }
      return '-'
    },
    width: 300
  },
  {
    title: '更新说明',
    dataIndex: 'description',
    width: 300
  }
]

// 上传文件控制器
let uploadModalHandler = null

const OTA = (props: IDeviceProps) => {
  // 记录表格中被选中的设备
  const [deviceType, setDeviceType] = useState('all')
  const { otaList, otaListPagination, loading } = props
  const { current, total, pageSize } = otaListPagination

  useEffect(() => {
    props.getOTAList({
      current,
      pageSize,
      deviceType
    })
  }, [])

  const handlePageChange = async (_current, _pageSize) => {
    await props.getOTAList({
      current: _current,
      pageSize: _pageSize,
      deviceType
    })
  }

  return (
    <div className="ota-management">
      {/* 升级面板 */}
      <Modal modalRef={handler => (uploadModalHandler = handler)} footer={null}>
        <Upload deviceType={deviceType} handler={uploadModalHandler} />
      </Modal>
      <Spin spinning={loading}>
        <div className="ota-control">
          <div className="right">
            <span style={{ marginRight: 8 }}>设备种类:</span>
            <Select
              style={{ width: 200 }}
              onChange={type => {
                setDeviceType(type)
                props.getOTAList({
                  current: 0,
                  pageSize,
                  deviceType: type
                })
              }}
              value={deviceType}
            >
              {DEVICE_TYPES.map(p => (
                <Option value={p.VALUE} key={p.VALUE}>
                  {p.LABEL}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              onClick={() => {
                uploadModalHandler.show()
              }}
            >
              上传
            </Button>
          </div>
        </div>
        <Table
          className="device-table"
          columns={
            [
              ...columns,
              {
                title: '操作',
                key: 'operation',
                width: 100,
                render: () => (
                  <div className="ota-operation">
                    <HorizonButton type={HorizonButtonTypes.borderless}>
                      删除
                    </HorizonButton>
                  </div>
                )
              }
            ] as any
          }
          dataSource={otaList}
          rowKey={record => record.id}
          pagination={{
            onChange: handlePageChange,
            onShowSizeChange: handlePageChange,
            showSizeChanger: true,
            total,
            current,
            pageSize
          }}
        />
      </Spin>
    </div>
  )
}

export default connect(
  mapState,
  mapDispatch
)(OTA)
