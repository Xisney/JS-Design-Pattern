// AOP(面向切面编程)的主要作用是把一些和核心业务逻辑模块无关的功能抽离
// 如日志统计、安全控制功能。之后通过动态植入的方式掺入业务逻辑
// 类似于插件，混入可以保证业务模块高内聚和纯净
// js中实现AOP通常把一个函数混入另一个函数之中，实现装饰者模式

// 通过aop的方式可以直接完成在执行主体业务前后增加其他功能的需求

Function.prototype.before = function (beforeFn) {
  const _self = this; // 保存函数本体
  // 返回新函数
  return function (...args) {
    beforeFn.apply(this, args);
    return _self.apply(this, args);
  };
};

Function.prototype.after = function (afterFn) {
  const _self = this;
  return function () {
    const res = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return res;
  };
};

// 另一种方式,不使用prototype
const before = function (beforeFn, fn) {
  return function () {
    beforeFn.apply(this, arguments);
    return fn.apply(this, arguments);
  };
};

const after = function (fn, afterFn) {
  return function () {
    const res = fn.apply(this, arguments);
    afterFn.apply(this, arguments);
    return res;
  };
};
