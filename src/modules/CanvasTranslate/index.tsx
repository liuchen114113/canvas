import React, { Component } from 'react'
import { IMutableRefObject } from '@/schemas/common'

import './index.less'

export default class CanvasTranslate extends Component {
  canvasRef: IMutableRefObject<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D

  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const canvas: HTMLCanvasElement = this.canvasRef.current
    this.ctx = canvas.getContext('2d')

    // this.ctx.setTransform(1, 1, 1, 1, 1, 1)
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(100, 100, 100, 100)
    // this.ctx.save()

    this.ctx.rotate(-Math.PI / 6)
    this.ctx.fillRect(200, 20, 100, 100)
    // this.ctx.save()
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
