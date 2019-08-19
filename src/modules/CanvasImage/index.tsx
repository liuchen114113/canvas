import React, { Component } from 'react'
import { IMutableRefObject } from '@/schemas/common'

import logo from '@/assets/images/favicon.png'

import './index.less'

export default class CanvasImage extends Component {
  canvasRef: IMutableRefObject<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D

  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const canvas: HTMLCanvasElement = this.canvasRef.current
    this.ctx = canvas.getContext('2d')
    let img = new Image() // 创建一个<img>元素
    img.src = logo // 设置图片源地址
    img.onload = () => {
      this.draw(this.ctx, img, 0, 0, 218, 194)
    }
  }

  draw = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ): void => {
    ctx.drawImage(image, x, y, width, height)
  }

  render() {
    return (
      <div className="canvas-container">
        <canvas
          ref={this.canvasRef}
          style={{
            width: '600',
            height: '300px',
            background: 'gray'
          }}
          width={600}
          height={300}
        />
      </div>
    )
  }
}
