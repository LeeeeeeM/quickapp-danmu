class TimerManager {
  constructor(options) {
    this.cbInstances = options
    this.timer = null
    this.isPaused = false 
    this.relativeBaseTime = Date.now()
    this.playedTime = Date.now()
  }

  start() {
    this.isPaused = false
    if (this.timer) return
    this.relativeBaseTime = Date.now() - this.playedTime + this.relativeBaseTime
    this._play()
  }
  pause() {
    if (this.isPaused) return
    this.isPaused = true
    this.playedTime = Date.now()
    clearTimeout(this.timer)
    this.timer=null
  }

  _play() {
    const _this = this
    this.timer = setTimeout(() => {
      this.cbInstances.forEach(cb => {
        cb(_this.relativeBaseTime)
      })
      this._play()
    }, 16)
  }

}

export default TimerManager
