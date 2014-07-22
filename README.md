# SYNOPSIS
I wrote this as an example to show only the most essential parts of
flow control with generators. Don't use this for apps, use something
robust like [`co`](https://github.com/visionmedia/co).

# REQUIREMENTS
Requires `>=0.11.x`, and `node --harmony <file>` to use generators.

# CODE

```js
module.exports = function yl(f) {

  if (!f.prototype.throw) return function () {
    var args = [].slice.call(arguments);
    return f.bind.apply(f, [null].concat(args));
  }

  var gen = f();

  ~function nextCallback(err, value) {
    if (err) return gen.throw(err);
    var next = gen.next(value);

    if (!next.done)
      next.value(nextCallback);
  }();
}
```

# EXAMPLE

```js
var fs = require('fs')
var assert = require('assert')

yl(function* () {

  var f = yield yl(fs.readFile)('./index.js')
  var s = yield yl(fs.stat)('./index.js')

  assert.equal(f.length, s.size)
})
```
