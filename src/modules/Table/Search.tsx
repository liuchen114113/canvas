import React from 'react'
import { Table, Modal, Input, Spin } from 'antd'
import { connect } from 'react-redux'
import { ImagePreview } from '@horizon/dawn-ui/lib/basic/ImagePreview'

import { IRootState, Dispatch } from '@/store'
import './Search.less'

const { confirm } = Modal
const { Search } = Input

const mapState = (state: IRootState) => ({
  list: state.table.records,
  pagination: state.table.pagination,
  loading: state.loading.effects.table.asyncTableList
})

const mapDispatch = (dispatch: Dispatch) => ({
  getList: dispatch.table.asyncTableList,
  deleteRecord: dispatch.table.asynctableDelete,
  updateState: dispatch.table.updateState
})

interface ISearchTableProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

interface ISearchTableState {
  searchText: string
}

class SearchTable extends React.Component<
  ISearchTableProps,
  ISearchTableState
> {
  constructor(props: ISearchTableProps) {
    super(props)

    this.state = {
      searchText: ''
    }
  }

  componentDidMount() {
    const {
      pagination: { current, pageSize },
      getList
    } = this.props
    const { searchText } = this.state

    getList({
      current,
      pageSize,
      searchText
    })
  }

  componentDidUpdate(_, prevState: ISearchTableState) {
    const {
      pagination: { current, pageSize }
    } = this.props
    const { searchText } = this.state

    // 当内部状态搜索内容改变时，需要重新请求列表
    if (searchText !== prevState.searchText) {
      this.props.getList({
        current,
        pageSize,
        searchText
      })
    }
  }

  handlePgaeChange = async (current, pageSize) => {
    const { searchText } = this.state

    await this.props.getList({
      current,
      pageSize,
      searchText
    })
  }

  handleSearch = searchText => {
    this.setState({
      searchText
    })
  }

  handleRecordDelete = recordId => () => {
    this.props.deleteRecord({ recordId })
  }

  renderTable = () => {
    const { list, pagination } = this.props
    const columns = [
      {
        title: '中文',
        dataIndex: 'name'
      },
      {
        title: '英文',
        dataIndex: 'id'
      },
      {
        title: '数字',
        dataIndex: 'count'
      },
      {
        title: '时间',
        dataIndex: 'time'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: 'ip',
        dataIndex: 'ip'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: status => (status ? '真' : '假')
      },
      {
        title: '图像',
        dataIndex: 'image',
        render: image => (
          <ImagePreview url={image} previewUrl={image} width={50} height={50} />
        )
      },
      {
        title: '操作',
        render: record => (
          <span
            className="btn-link"
            onClick={() => {
              confirm({
                title: '确认删除?',
                content: '是否确认删除',
                onOk: this.handleRecordDelete(record.id)
              })
            }}
          >
            删除
          </span>
        )
      }
    ]

    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        pagination={{
          ...pagination,
          onChange: this.handlePgaeChange
        }}
      />
    )
  }

  render() {
    const { loading } = this.props

    return (
      <Spin spinning={loading}>
        <div className="search-table">
          <div className="operation">
            <Search
              placeholder="关键字：状态，ip"
              enterButton="搜索"
              onSearch={this.handleSearch}
              style={{
                width: 400
              }}
            />
          </div>
          {this.renderTable()}
        </div>
      </Spin>
    )
  }
}

export default connect(
  mapState,
  mapDispatch
)(SearchTable)
