function formatData(data) {
  const result = []
  const dataArr = data.split('</source>')[1].split('<d p="')
  dataArr.forEach(item => {
    if (item) {
      const itemArr = item.split('">')
      const meta = itemArr.shift().split(',')
      if (meta[1] === '1') {
        const text = itemArr.join('').split('</d>')[0]
        const beginAt = +meta[0]

        result.push({
          beginAt,
          ts: +meta[4] * 1000,
          id: meta[7],
          text
        })
      }
    }
  })
  return result.sort((a, b) => a.beginAt - b.beginAt)
}


export function toJSON(xml) {
  return formatData(xml)
}

export function textComputed(text) {
  return text.replace(/([^\x00-\xff]|[\u4e00-\u9fa5])/igm, 'aa').length * 14
}

export function speedComputed(length) {
  return Math.pow(length * 0.3, 1 / 3)
}

export function computeLeft(a,b) {
  return (a-b)/2
}

export function lineHeight(height,lines) {
  return height/lines
}
