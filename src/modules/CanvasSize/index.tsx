import React, { Component } from 'react'
import { IMutableRefObject } from '@/schemas/common'

import './index.less'

export default class CanvasSize extends Component {
  canvasRef1: IMutableRefObject<HTMLCanvasElement>
  canvasRef2: IMutableRefObject<HTMLCanvasElement>
  canvasRef3: IMutableRefObject<HTMLCanvasElement>

  constructor(props) {
    super(props)

    this.canvasRef1 = React.createRef()
    this.canvasRef2 = React.createRef()
    this.canvasRef3 = React.createRef()
  }

  componentDidMount() {
    const canvas1: HTMLCanvasElement = this.canvasRef1.current
    const ctx1: CanvasRenderingContext2D = canvas1.getContext('2d')
    this.draw(ctx1)

    const canvas2: HTMLCanvasElement = this.canvasRef2.current
    const ctx2: CanvasRenderingContext2D = canvas2.getContext('2d')
    this.draw(ctx2)

    const canvas3: HTMLCanvasElement = this.canvasRef3.current
    const ctx3: CanvasRenderingContext2D = canvas3.getContext('2d')
    this.draw(ctx3)
  }

  /**
   * 绘制笑脸
   */
  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.lineWidth = 3
    ctx.beginPath()

    ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // 绘制

    ctx.moveTo(110, 75)
    ctx.arc(75, 75, 35, 0, Math.PI, false) // 口(顺时针)

    ctx.moveTo(65, 65)
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true) // 左眼

    ctx.moveTo(95, 65)
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // 右眼

    ctx.stroke()
  }

  render() {
    return (
      <div className="canvas-container">
        <canvas
          ref={this.canvasRef1}
          style={{
            width: '300px',
            height: '150px',
            background: 'gray'
          }}
          width={300}
          height={150}
        />
        <canvas
          ref={this.canvasRef2}
          style={{
            width: '500px',
            height: '250px',
            background: 'gray'
          }}
          width={300}
          height={150}
        />
        <canvas
          ref={this.canvasRef3}
          style={{
            width: '400px',
            height: '400px',
            background: 'gray'
          }}
          width={300}
          height={150}
        />
      </div>
    )
  }
}
