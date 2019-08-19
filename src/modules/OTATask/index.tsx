import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { IRootState, Dispatch } from '@/store'
import { Table, Spin, Tag } from 'antd'
import moment from 'moment'
import { Button, ButtonTypes } from '@horizon/dawn-ui'

import { TASK_STATUSES } from './constants'

import './index.less'

const mapState = (state: IRootState) => ({
  loading: state.loading.effects.otaTask.asyncList,
  taskList: state.otaTask.list,
  taskListPagination: state.otaTask.pagination
})

const mapDispatch = (dispatch: Dispatch) => ({
  getTaskList: dispatch.otaTask.asyncList
})

// 设备信息模型定义
export interface IOTATask {
  id: string
  createdTime: string
  status: string
}

interface IOTATaskProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

// 定义设备列表展现字段形态
const columns = [
  {
    title: '任务ID',
    dataIndex: 'id',
    width: 400
  },
  {
    title: '开始时间',
    key: 'createdTime',
    render: (record: IOTATask) => {
      if (record.createdTime) {
        return moment(record.createdTime).format('YYYY-MM-DD HH:mm:ss')
      }
      return '-'
    },
    width: 150
  },
  {
    title: '任务状态',
    width: 100,
    render: (record: IOTATask) => {
      const TASK = TASK_STATUSES[record.status.toUpperCase()]
      return (
        <Tag style={{ width: 60, textAlign: 'center' }} color={TASK.COLOR}>
          {TASK.LABEL}
        </Tag>
      )
    }
  }
]

const OTATask = (props: IOTATaskProps) => {
  const { taskList, taskListPagination, loading } = props
  const { current, total, pageSize } = taskListPagination

  useEffect(() => {
    props.getTaskList({
      current,
      pageSize
    })
  }, [])

  const handlePageChange = async (_current, _pageSize) => {
    await props.getTaskList({
      current: _current,
      pageSize: _pageSize
    })
  }

  return (
    <div className="ota-task">
      <Spin spinning={loading}>
        <Table
          className="device-table"
          columns={
            [
              ...columns,
              {
                title: '操作',
                key: 'operation',
                width: 200,
                render: () => (
                  <div className="ota-operation">
                    <Button type={ButtonTypes.borderless}>停止</Button>
                    <Button type={ButtonTypes.borderless}>重启</Button>
                    <Button type={ButtonTypes.borderless}>删除</Button>
                  </div>
                )
              }
            ] as any
          }
          dataSource={taskList}
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
)(OTATask)
