// 发布者
const pub = {};
pub.cache = {};

pub.listen = function (key, fn) {
  if (!this.cache[key]) {
    this.cache[key] = [];
  }
  // push 返回值为新数组的长度，可以推入一个或多个元素
  this.cache[key].push(fn);
};

pub.trigger = function (key, ...args) {
  const target = this.cache[key];
  if (target) {
    target.forEach((fn) => {
      fn(...args);
    });
  }
};

// 利用remove取消订阅
pub.remove = function (key, fn) {
  const target = this.cache[key];
  if (target) {
    target.forEach((value, index) => {
      if (value === fn) {
        target.splice(index, 1);
      }
    });
  }
};

const handler = (msg) => {
  console.log("1收到来自pub的消息：", msg);
};
pub.listen("1", handler);

pub.listen("2", (msg) => {
  console.log("2收到来自pub的消息：", msg);
});

pub.remove("1", handler);
pub.trigger("1", "通知1");
pub.trigger("2", "通知2");
