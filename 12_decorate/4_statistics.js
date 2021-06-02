// AOP实现数据统计上报

// 登录按钮实现打开登录页面并统计数据

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

const btn = document.querySelector("#login");

function showLogin() {
  console.log("show login");
}

showLogin = showLogin.after(function () {
  console.log("数据统计");
});

// this 为btn对象
btn.onclick = showLogin;
