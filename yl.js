const yl = module.exports = f => {

  if (!f.prototype.throw) return function() {
    const args = Array.from(arguments)
    return f.bind.apply(f, [null, ...args])
  }

  const gen = f()

  ~function nextCallback() {
    const args = Array.from(arguments)
    const next = gen.next(args)
    if (!next.done) next.value(nextCallback)
  }()
}

