export default {
  //邮箱、手机号码过滤
  substring(data) {
    if (data) {
      if (data.indexOf('@') > -1) {
        let arr = data.split('@')
        let name = data.substring(0, 4) + '***@' + arr[1]
        return name
      }
      let name =
        data.substring(0, 3) +
        '***' +
        data.substring(data.length - 4, data.length)
      return name
    }
  },
  coins(data) {
    if (data) {
      let arr = data.toUpperCase().split('_')
      return arr[0] + ' / ' + arr[1]
    }
  },
  trading(data) {
    if (data) {
      let arr = data.toUpperCase().split('_')
      return arr[0]
    }
  },
  pricing(data) {
    if (data) {
      let arr = data.toUpperCase().split('_')
      return arr[1]
    }
  },
  toPrecise(val, part) {
    if (val) {
      return Number(val).toFixed(part)
    } else {
      return 0
    }
  },
  formatting(data) {
    var time = new Date(data)
    var h = time.getHours()
    var mm = time.getMinutes()
    var s = time.getSeconds()
    return add0(h) + ':' + add0(mm) + ':' + add0(s)
  },
  omit(val, length) {
    return val.length <= length ? val : val.substring(0, length) + '...'
  },
  obainTime(i) {
    let current = new Date(),
      startDate = new Date(current.getTime() - i * 24 * 60 * 60 * 1000)
    return {
      startDate: format(startDate),
      endDate: format(current)
    }
  }
}

function add0(m) {
  return m < 10 ? '0' + m : m
}
function format(date) {
  var time = new Date(date)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return (
    y +
    '-' +
    add0(m) +
    '-' +
    add0(d) +
    ' ' +
    add0(h) +
    ':' +
    add0(mm) +
    ':' +
    add0(s)
  )
}
