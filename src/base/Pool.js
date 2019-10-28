import Shoot from './Shoot'

class Pool {
  constructor() {
    this.list = []
  }
  addShoot(options, line, windowWidth, windowHeight, isFullScreen, duration) {
    const shoot = Shoot.getPooler(options, line, windowWidth, windowHeight, isFullScreen, duration)
    this.list.push(shoot)
  }
  removeShoot(index) {
    this.list.splice(index, 1)
  }
  changePos(index) {
    const shot = this.list[index]
    shot.move()
  }
}

export default Pool
