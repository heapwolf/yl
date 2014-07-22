
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

