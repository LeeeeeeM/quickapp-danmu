/* eslint-disable no-fallthrough */
import { textComputed, speedComputed, computeLeft } from './util'
import addToPool from './base-pool'

class Shoot {
  constructor(options, top, windowWidth, windowHeight, isFullScreen, duration) {
    this.id = options.id  //对应弹幕id
    this.text = options.text  //文字
    this.fullscreenLeft = windowHeight  //全屏时位移left值
    this.unFullLeft = options.left || windowWidth //非全屏时位移left值

    this.color = options.color || '#ff0000' // 字体颜色 默认f00
    this.mode = options.mode || 'scroll'  //运动方式
    this.textLength = textComputed(this.text) //文字长度
    this.left = isFullScreen ? windowHeight : this.unFullLeft //弹幕的left位置
    this.top = top  //弹幕的top位置

    this.duration = options.duration || duration  //存活时长
    this.speed = options.speed || speedComputed(this.textLength + this.left)
    this.leftcomputed(this.mode)
  }

  setV() {

  }

  leftcomputed(mode) {
    switch (mode) {
    case 'scroll':
      this.left = this.left
      break
    case 'reverse':
      this.left = - this.textLength
      this.speed = - this.speed
      this.unFullLeft = - this.textLength
      this.fullscreenLeft = - this.textLength
      break
    default :
      this.left = computeLeft(this.left, this.textLength)
      this.speed = 0
      this.unFullLeft = computeLeft(this.unFullLeft, this.textLength)
      this.fullscreenLeft = computeLeft(this.fullscreenLeft, this.textLength)
    }
  }

  move() {
    this.left = this.left - this.speed
    this.unFullLeft -= this.speed
    this.fullscreenLeft -= this.speed * 2
    this.duration -= 16
  }
}
export default addToPool(Shoot, 40)
