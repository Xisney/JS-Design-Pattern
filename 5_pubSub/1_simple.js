// 发布订阅(观察者)模式
// 定义对象间的一种一对多的依赖关系，
// 当一个对象的状态改变时，所有依赖于它的对象都将得到通知
// js中一般用事件模型来替代pubSub publish、subscribe

// 实现：
// 指定发布者
// 给发布者添加缓存列表，存放相关的回调函数用以通知订阅者
// 发布消息时，遍历列表，触发相关回调函数

const salesOffice = {};
salesOffice.cache = [];

salesOffice.listen = function (fn) {
  this.cache.push(fn);
};

salesOffice.trigger = function (...args) {
  this.cache.forEach((fn) => {
    fn(...args);
  });
};

salesOffice.listen((price, area) => {
  console.log("订阅者收到通知", price, area);
});

salesOffice.trigger("100w", 99);
salesOffice.trigger("1000w", 199);
