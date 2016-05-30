const fs = require('fs')
const assert = require('assert')

const { run, wrap } = require('./yl')

//
// an example async function
//
function async(val, cb) {
  setTimeout(function() {
    cb(null, val)
  }, 1)
}

function bad(val, cb) {
  setTimeout(function() {
    try {
      foo + bar
    } catch(ex) {
      return cb(ex)
    }
    cb(null, val)
  }, 1)
}

//
// create a generator to yield in
//
run(function* () {

  async = wrap(async)

  const [erra, a] = yield async(1)
  const [errb, b] = yield async(2)
  const [errc, c] = yield async(3)
  const [errd, d] = yield async(4)

  assert.equal(a, 1)
  assert.equal(b, 2)
  assert.equal(c, 3)
  assert.equal(d, 4)

  const [err0, v] = yield wrap(bad)('asdf')
  assert.equal(err0.name, 'ReferenceError')

  const [err1, f] = yield wrap(fs.readFile)('./yl.js')
  const [err2, s] = yield wrap(fs.stat)('./yl.js')

  assert.equal(f.length, s.size)

  wrap(fs)

  const [err3, fi] = yield fs.readFile('./yl.js')
  const [err4, si] = yield fs.stat('./yl.js')

  assert.equal(f.length, s.size)
})

