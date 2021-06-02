// 订阅时利用key，订阅自己感兴趣的消息，而不是发布者广播所有订阅者

const pub = {};
// 利用对象(键值对hash的形式)管理不同key的订阅者
pub.subCache = {};

pub.listen = function (key, fn) {
  if (!this.subCache[key]) {
    this.subCache[key] = [];
  }
  this.subCache[key].push(fn);
};

pub.trigger = function (key, ...args) {
  if (this.subCache[key]) {
    this.subCache[key].forEach((fn) => {
      fn(...args);
    });
  }
};

pub.listen("1", (msg) => {
  console.log("1收到来自pub的消息：", msg);
});

pub.listen("2", (msg) => {
  console.log("2收到来自pub的消息：", msg);
});

pub.trigger("1", "通知1");
pub.trigger("2", "通知2");
