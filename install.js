const yl = require('./yl')

module.exports = o => {
  for (f in o) {
    if (typeof o[f] === 'function' &&
        f.indexOf('Sync') === -1) {
      o[f] = yl(o[f])
    }
  }
  return o
}

