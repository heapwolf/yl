# SYNOPSIS
A tiny flow control module that destructures.

# CODE

```js
const $ = module.exports = f => {

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
```

# EXAMPLE

```js
$(function* () {

  const [statError, s] = yield $(fs.stat)('./index.js')

  if (statError) return console.error(statError)

  const [readError, f] = yield $(fs.readFile)('./index.js')

  assert.equal(f.length, s.size)
})
```

