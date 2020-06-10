const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getUri() {
  return 'https://lytx.pskjcs.cn/'
}
module.exports = {
  formatTime: formatTime,
  key: 'a1320237fc3b49fcb7b7fbecddd41cc2',
  getUri: getUri
}
