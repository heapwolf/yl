exports.run = f => {
  if (!f.prototype.throw) return function() {
    const args = Array.from(arguments)
    return f.bind.apply(f, [null, ...args])
  }

  const gen = f()

  ~function nextCallback() {
    const next = gen.next(Array.from(arguments))
    if (!next.done) next.value(nextCallback)
  }()
}

exports.wrap = o => {
  if (typeof o === 'function') {
    return exports.run(o)
  }

  for (f in o) {
    if (typeof o[f] === 'function' &&
        f.indexOf('Sync') === -1) {
      o[f] = exports.run(o[f])
    }
  }
  return o
}

