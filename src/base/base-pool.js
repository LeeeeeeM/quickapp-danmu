const DEFAULT_POOL_SIZE = 10

function pooler (...args) {
  const Klass = this
  if (Klass.instancePool.length) {
    const instance = Klass.instancePool.pop()
    Klass.apply(instance, args)
    return instance
  } else {
    return new Klass(...args)
  }
}

function releaser (instance) {
  const Klass = this
  if (!(instance instanceof Klass)) {
    console.warn(`${instance} 不是 ${Klass}的实例`)
    return
  }

  instance.dispose && instance.dispose()

  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance)
  }
}

export default function addPoolingTo (ctor, size) {
  const Klass = ctor
  Klass.instancePool = []
  Klass.poolSize = DEFAULT_POOL_SIZE || size
  Klass.getPooler = pooler
  Klass.release = releaser
  return Klass
}
