
module.exports = function yl(gen) {

  if (!gen.prototype.throw) return function () {
    var args = [].slice.call(arguments);
    return gen.bind.apply(gen, [null].concat(args));
  }

  gen = gen();

  ~function nextCallback(err, value) {
    if (err) return gen.throw(err);
    var next = gen.next(value);

    if (!next.done)
      next.value(nextCallback);
  }();
}

