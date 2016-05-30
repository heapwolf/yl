const fs = require('fs')
const assert = require('assert')

const $ = require('./yl')

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
$(function* () {

  async = $(async)

  const [erra, a] = yield async(1)
  const [errb, b] = yield async(2)
  const [errc, c] = yield async(3)
  const [errd, d] = yield async(4)

  assert.equal(a, 1)
  assert.equal(b, 2)
  assert.equal(c, 3)
  assert.equal(d, 4)

  const [err0, v] = yield $(bad)('asdf')
  assert.equal(err0.name, 'ReferenceError')

  const [err1, f] = yield $(fs.readFile)('./yl.js');
  const [err2, s] = yield $(fs.stat)('./yl.js');

  assert.equal(f.length, s.size);
});

