# SYNOPSIS
A tiny flow control module that destructures.

# CODE

```js
module.exports = f => {

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
```

# EXAMPLE

```js
const { run, wrap } = require('yl')
const fs = require('fs')
const assert = require('assert')

run(function* () {

  const [statError, s] = yield wrap(fs.stat)('./index.js')

  if (statError) return console.error(statError)

  const [readError, f] = yield wrap(fs.readFile)('./index.js')

  assert.equal(f.length, s.size)
})
```

Or you could wrap everything initially...

```js
const { run, wrap } = require('yl')
const fs = wrap(require('fs'))

run(function* () {

  const [statError, s] = yield fs.stat('./index.js')
  const [readError, f] = yield fs.readFile('./index.js')

  assert.equal(f.length, s.size)
})
```

