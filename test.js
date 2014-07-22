var fs = require('fs');
var assert = require('assert');

var yl = require('./yl');

//
// an example async function
//
function async(val, cb) {
  setTimeout(function() {
    cb(null, val);
  }, 1);
}

//
// create a generator to yield in
//
yl(function* () {

  async = this.thunk(async);

  var a = yield async(1);
  var b = yield async(2);
  var c = yield async(3);
  var d = yield async(4);

  assert.equal(a, 1);
  assert.equal(b, 2);
  assert.equal(c, 3);
  assert.equal(d, 4);

  readFile = this.thunk(fs.readFile);
  stat = this.thunk(fs.stat);

  var f = yield readFile('./yl.js');
  var s = yield stat('./yl.js');
  assert.equal(f.length, s.size);

});

