# SYNOPSIS
I wrote this as an example to show only the most essential parts of
flow control with generators. Don't use this for apps, use something
robust like [`co`](https://github.com/visionmedia/co).

# REQUIREMENTS
Requires `>=0.11.x`, and `node --harmony <file>` to use generators.

# CODE

```js

module.exports = function yl(gen) {

  gen = gen.call({ 
    thunk: function (fn) {
      return function () {
        var args = [].slice.call(arguments);
        return function (cb) {
          args.push(cb);
          fn.apply(this, args);
        }
      }
    }
  });

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
yl(function* () {

  readFile = this.thunk(fs.readFile);
  stat = this.thunk(fs.stat);

  var f = yield readFile('./yl.js');
  var s = yield stat('./yl.js');
  assert.equal(f.length, s.size);

});
```

