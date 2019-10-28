import Pool from './Pool'
class Stage {
  constructor(options = {}, fn) {
    this.isPaused = false
    this.pool = new Pool()
    this.lines = options.lines || 4
    this.lineIndex = 0
    this.animateFn = fn && fn.bind(this) || this.fn.bind(this)
    this.duration = options.duration || 4000
    this.area = options.area || 1

    this.isAllow = options.allowoverlap //是否允许超出显示区域弹幕显示
    this.isFullScreen = false
    this.windowWidth = options.windowWidth || 750
    this.windowHeight = options.windowHeight || 1500
  }

  fn() {
    let pool = this.pool
    // 回调逻辑
    for (let i = pool.list.length - 1; i >= 0; i--) {
      pool.changePos(i)
      if (pool.list[i].duration < 0) {
        pool.removeShoot(i)
      }
    }
  }

  addShoot(element) {    
    this.pool.addShoot(element, this.topCompute(element), this.windowWidth, this.windowHeight, this.isFullScreen, this.duration)
  }

  topCompute(element) {
    let line = this.lineIndex++ % this.lines
    if (this.isAllow && this.areaLine <= line) {
      line = this.lineIndex % this.areaLine
      element.color = '#0000ff'
    }
    let top = this.lineHeight * line
    if (this.areaLine <= this.lines && this.areaLine === line) top += 30
    
    return top
  }

  lineHeightCompute(boxHeight) {
    this.lineHeight = boxHeight / this.lines
  }
  //弹幕全屏
  fullScreenChange(isFullScreen) {
    this.isFullScreen = isFullScreen
    this.changeLeft(this.isFullScreen)
  }
  //弹幕全屏改变相对应的left
  changeLeft(isFullScreen) {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].left = isFullScreen ? this.list[i].fullscreenLeft : this.list[i].unFullLeft
    }
  }

  //计算显示区域可显示条数
  areaLineCom() {
    this.areaLine = Math.floor(this.area * this.boxHeight / this.lineHeight)
  }

  get list() {
    return this.pool && this.pool.list
  }
}
export default Stage
