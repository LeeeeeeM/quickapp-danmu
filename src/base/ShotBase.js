class ShotBase {
  constructor(list) {
    this.shotsource = list
    this.index = 0
    this.relativeBaseTime = Date.now()
    this.playedTime = Date.now()
    this.isPaused = false
    this.fns = []
    this.emit = this._emit.bind(this)
  }

  subscribe(fn) {
    this.fns.push(fn)
    return this
  }

  _emit(time) {
    this.relativeBaseTime = time
    if (this.index >= this.shotsource.length) {
      this.pause()
      return
    }
    this.emitLogic()
  }

  emitLogic() {
    const span = Date.now() - this.relativeBaseTime
    const result = []
    while (span / 1000 >= this.shotsource[this.index].beginAt) {
      result.push(this.shotsource[this.index])
      this.index++
      if (this.index >= this.shotsource.length) break
    }
    if (result.length) {
      this.fns.forEach(fn => {
        fn(result)
      })
    }
  }

  start() {
    this.relativeBaseTime = Date.now() - this.playedTime + this.relativeBaseTime
  }

  drag(time) {
    // time相对时间
    this.relativeBaseTime = Date.now() - time

    this.index = 0

    while (time / 1000 >= this.shotsource[this.index].beginAt) {
      this.index++
      if (this.index >= this.shotsource.length) break
    }

    this._emit()
  }

  pause() {
    this.playedTime = Date.now()
  }
}

export default ShotBase
