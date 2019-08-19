import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { IRootState, Dispatch } from '@/store'
import { Table, Alert, Select, Spin, Button } from 'antd'
import { ImagePreview, Modal } from '@horizon/dawn-ui'
import moment from 'moment'

import Operation from './Operation'
import Params from './Params'
import Update from './Update'
import { DEVICE_TYPE, DEVICE_TYPES } from './constants'

import './index.less'

const Option = Select.Option

const mapState = (state: IRootState) => ({
  loading: state.loading.effects.device.asyncList,
  deviceList: state.device.list,
  deviceListPagination: state.device.pagination
})

const mapDispatch = (dispatch: Dispatch) => ({
  getDeviceList: dispatch.device.asyncList,
  configDevice: dispatch.device.config
})

// 设备信息模型定义
export interface IDeviceInfo {
  ip: string
  id: string
  sn: string
  previewUrl: string
  manufacture: string
  model: string
  runningStatus: number
  position: string
  ota: string
  recentHeart: string
  createdTime: string
  deviceType: DEVICE_TYPE
}

interface IDeviceProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

// 定义设备列表展现字段形态
const columns = [
  {
    title: '预览图',
    key: 'previewUrl',
    render: (record: IDeviceInfo) => (
      <ImagePreview
        url={record.previewUrl}
        previewUrl={record.previewUrl}
        width={80}
        height={50}
      />
    ),
    fixed: 'left',
    width: 100
  },
  {
    title: '位置',
    dataIndex: 'position',
    width: 200,
    fixed: 'left'
  },
  {
    title: '设备id',
    key: 'id',
    dataIndex: 'id'
  },
  {
    title: 'SN码',
    key: 'sn',
    dataIndex: 'sn'
  },
  {
    title: 'IP',
    dataIndex: 'ip'
  },
  {
    title: '厂商',
    dataIndex: 'manufacture'
  },
  {
    title: '设备型号',
    dataIndex: 'model'
  },
  {
    title: '设备种类',
    key: 'deviceType',
    render: (record: IDeviceInfo) => {
      switch (record.deviceType) {
        case DEVICE_TYPE.PASSENGERFLOW:
          return '客流机'
        case DEVICE_TYPE.RECOGNITION:
          return '识别机'
        case DEVICE_TYPE.SNAPSHOT:
          return '抓拍机'
      }
      return '-'
    }
  },
  {
    title: 'ota版本',
    dataIndex: 'ota'
  },
  {
    title: '最近心跳',
    key: 'recentHeart',
    render: (record: IDeviceInfo) => {
      if (record.recentHeart) {
        return moment(record.recentHeart).format('YYYY-MM-DD HH:mm:ss')
      }
      return '-'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (record: IDeviceInfo) => {
      if (record.createdTime) {
        return moment(record.createdTime).format('YYYY-MM-DD HH:mm:ss')
      }
      return '-'
    }
  },
  {
    title: '运行状态',
    key: 'runningStatus',
    render: (record: IDeviceInfo) => {
      if (record.runningStatus) {
        return record.runningStatus === 1 ? '在线' : '离线'
      } else {
        return '-'
      }
    },
    fixed: 'right',
    width: 60
  }
]

let configDeviceModalHandler = null
let updateModalHandler = null

const Device = (props: IDeviceProps) => {
  // 记录表格中被选中的设备
  const [selectedDevices, setSelectedDevices] = useState([])
  const [deviceType, setDeviceType] = useState('all')
  const { deviceList, deviceListPagination, loading } = props
  const { current, total, pageSize } = deviceListPagination

  useEffect(() => {
    setSelectedDevices([])
    props.getDeviceList({
      current,
      pageSize,
      deviceType
    })
  }, [])

  const handlePageChange = async (_current, _pageSize) => {
    await props.getDeviceList({
      current: _current,
      pageSize: _pageSize,
      deviceType
    })
  }

  return (
    <div className="device-management">
      {/* 调参面板 */}
      <Modal
        modalRef={handler => (configDeviceModalHandler = handler)}
        footer={null}
      >
        <Params
          deviceType={deviceType}
          selectedDevices={selectedDevices}
          handler={configDeviceModalHandler}
        />
      </Modal>
      {/* 升级面板 */}
      <Modal modalRef={handler => (updateModalHandler = handler)} footer={null}>
        <Update
          deviceType={deviceType}
          selectedDevices={selectedDevices}
          handler={updateModalHandler}
        />
      </Modal>
      <Spin spinning={loading}>
        <div className="device-control">
          <Alert
            className="select-tip"
            type="info"
            showIcon={true}
            message={
              <>
                <span>
                  已选择 {selectedDevices.length} 项 共计：
                  {deviceListPagination.total} 项
                </span>
                <span className="clear" onClick={() => setSelectedDevices([])}>
                  清空
                </span>
              </>
            }
          />
          <div className="right">
            <span style={{ marginRight: 8 }}>设备种类:</span>
            <Select
              style={{ width: 200 }}
              onChange={type => {
                setDeviceType(type)
                setSelectedDevices([])
                props.getDeviceList({
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
            {deviceType !== 'all' && (
              <div className="operation-groups">
                <Button
                  type="primary"
                  disabled={selectedDevices.length === 0}
                  onClick={() => {
                    configDeviceModalHandler.show()
                  }}
                >
                  调参
                </Button>
                <Button
                  type="primary"
                  disabled={selectedDevices.length === 0}
                  onClick={() => {
                    updateModalHandler.show()
                  }}
                >
                  升级
                </Button>
              </div>
            )}
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
                width: 300,
                fixed: 'right',
                render: record => <Operation device={record} />
              }
            ] as any
          }
          dataSource={deviceList}
          scroll={{ x: 2500 }}
          rowKey={record => record.id}
          rowSelection={
            deviceType !== 'all'
              ? {
                  selectedRowKeys: selectedDevices.map(d => d.id),
                  onChange: (_, selectedRows) => {
                    setSelectedDevices(selectedRows)
                  }
                }
              : null
          }
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
)(Device)
