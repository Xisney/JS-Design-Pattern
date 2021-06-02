Function.prototype.after = function (next) {
  return () => {
    const fn = this,
      res = fn.apply(this, arguments);
    if (res === "nextNode") {
      return next.apply(this, arguments);
    }
    return res;
  };
};

const order = order500.after(order200).after(orderNormal);

// 直接调用order即可
