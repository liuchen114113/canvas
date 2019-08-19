import React, { Component } from 'react'
import { IMutableRefObject } from '@/schemas/common'

import movie from '@/assets/video/Promotional_Film.mp4'

import './index.less'

export default class CanvasVideo extends Component {
  canvasRef: IMutableRefObject<HTMLCanvasElement>
  videoRef: IMutableRefObject<HTMLVideoElement>
  ctx: CanvasRenderingContext2D
  timer: any

  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()
    this.videoRef = React.createRef()
  }

  componentDidMount() {
    const canvas: HTMLCanvasElement = this.canvasRef.current
    this.ctx = canvas.getContext('2d')
  }

  onVideoPlay = () => {
    this.playOnCanvas()
  }

  playOnCanvas = () => {
    this.timer = requestAnimationFrame(this.playOnCanvas)
    const video = this.videoRef.current
    this.draw(this.ctx, video)
    if (video.ended) {
      cancelAnimationFrame(this.timer)
    }
  }

  onVideoPause = () => {
    cancelAnimationFrame(this.timer)
  }

  /**
   * 绘制笑脸
   */
  draw = (ctx: CanvasRenderingContext2D, video: HTMLVideoElement): void => {
    ctx.drawImage(video, 0, 0, 533, 300)
  }

  render() {
    return (
      <div className="canvas-container">
        <video
          onPlay={this.onVideoPlay}
          onPause={this.onVideoPause}
          height={300}
          ref={this.videoRef}
          src={movie}
          controls
        ></video>
        <canvas
          ref={this.canvasRef}
          style={{
            width: '533',
            height: '300px',
            background: 'gray'
          }}
          width={533}
          height={300}
        />
      </div>
    )
  }
}
