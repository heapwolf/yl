
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

