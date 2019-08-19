import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Collapse, Upload } from 'antd'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/acai.css'

import { Dispatch, IRootState } from '@/store'
import { removeBase64Prefix } from '@/utils/helpers'

import './index.less'

const { Panel } = Collapse
const { Search } = Input

// 此处放外部需要传递进来的 props 属性
interface IDriveProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

interface IDriveState {
  videoUrl: string
  videos: string[]
}

// 此处映射 model 里面的 state 到 props 上
const mapState = (state: IRootState) => ({
  rawData: state.drive.rawData,
  personNum: state.drive.personNum,
  personInfo: state.drive.personInfo,
  loading: state.loading.effects.drive.asyncDriveBehavior
})

// 此处映射 model 里面的方法(effects, reducers)到 props 上
const mapDispatch = (dispatch: Dispatch) => ({
  driveBehavior: dispatch.drive.asyncDriveBehavior
})

class Drive extends Component<IDriveProps, IDriveState> {
  requestId: number

  constructor(props) {
    super(props)

    const protocol = window.location.protocol
    let host = window.location.host
    if (process.env.NODE_ENV === 'development') {
      host = '10.10.108.157:8005'
    }
    const videos = [...Array(20).keys()].map(
      item => `${protocol}//${host}/video/${item + 1}.mp4`
    )

    this.state = {
      videoUrl: '',
      videos
    }

    this.requestId = 0
  }

  beforeUpload = file => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (event: any) => {
      const videoBase64 = event.target.result
      this.setState(state => ({
        videoUrl: videoBase64,
        videos: [videoBase64, ...state.videos]
      }))
      this.props.driveBehavior({
        videoBase64: removeBase64Prefix(videoBase64),
        videoType: 1,
        requestId: this.requestId
      })
      ++this.requestId
    }
    return false
  }

  submitUrl = url => {
    this.setState(state => ({
      videoUrl: url,
      videos: [url, ...state.videos]
    }))
    this.props.driveBehavior({
      videoUrl: url,
      videoType: 0,
      requestId: this.requestId
    })
    ++this.requestId
  }

  changeVideo = url => () => {
    this.submitUrl(url)
  }

  renderResult = (infos: any[]) => {
    const tmp = [
      {
        label: '抽烟',
        key: 'smoke'
      },
      {
        label: '使用手机',
        key: 'cellphone'
      },
      {
        label: '闭眼',
        key: 'closeEye'
      },
      {
        label: '未正视前方',
        key: 'notFaceFront'
      },
      {
        label: '打哈欠',
        key: 'yawn'
      }
    ]

    return infos.map((item: any) => {
      return (
        <div key={item} className="result">
          {tmp.map((obj: any) => (
            <div key={item} className="label">
              <span>{obj.label}</span>
              <span style={{ marginLeft: '20px' }}>
                {item.attributes[obj.key].exist ? '是' : '否'}
              </span>
            </div>
          ))}
        </div>
      )
    })
  }

  renderLoading = () => <div className="result">正在分析...</div>

  render() {
    return (
      <div className="drive">
        <div>
          <div className="video">
            <video autoPlay={true} width={600} src={this.state.videoUrl} />
            {this.props.loading
              ? this.renderLoading()
              : this.props.personNum
              ? this.renderResult(this.props.personInfo)
              : null}
          </div>
          <div className="card-container">
            {this.state.videos.map(item => (
              <div className="card" key={item} onClick={this.changeVideo(item)}>
                <video src={item} width={120} />
              </div>
            ))}
          </div>
          <div className="right">
            <Search
              placeholder="请输入网络视频URL"
              style={{ width: '400px', marginRight: '50px' }}
              enterButton="检测"
              onSearch={this.submitUrl}
            />
            <Upload
              accept="video/*"
              beforeUpload={this.beforeUpload}
              showUploadList={false}
            >
              <Button type="primary">本地上传</Button>
            </Upload>
          </div>
          <div>请上传视频，大小不超过 10M，格式为 avi/mpeg</div>
        </div>

        <div style={{ width: '400px' }}>
          <Collapse defaultActiveKey={['request']} accordion={true}>
            <Panel header="Request" key="request">
              <div style={{ height: '370px' }}>
                <p>
                  <b>Params</b>
                </p>
                <p>video_url="视频的url"</p>
                <p>video_base64="视频的Base64编码"</p>
                <p>
                  <b>Post</b>
                </p>
                <p>https://dms.horizon.ai/dms/v1/driver_behavior</p>
                <p>
                  <b>Header</b>
                </p>
                <p>Content-Type: "application/json"</p>
              </div>
            </Panel>
            <Panel header="Response" key="response">
              <JSONPretty id="json-pretty" data={this.props.rawData} />
            </Panel>
          </Collapse>
        </div>
      </div>
    )
  }
}

export default connect(
  mapState,
  mapDispatch
)(Drive)
