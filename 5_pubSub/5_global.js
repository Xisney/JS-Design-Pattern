// 利用全局对象，提供一个中介者给所有对象使用pubSub
// 进一步降低对象之间的耦合，但同时也将数据的信息流屏蔽
// 有利也有弊

// 改造相关函数，实现先发布后订阅的效果
const pubSub = {
  cache: {},
  offlineCache: {},
  listen(key, fn) {
    if (!this.cache[key]) {
      this.cache[key] = [];
    }
    // push 返回值为新数组的长度，可以推入一个或多个元素
    this.cache[key].push(fn);

    if (this.offlineCache[key]) {
      this.offlineCache[key].forEach((fn) => {
        fn();
      });
      delete this.offlineCache[key];
    }
  },
  trigger(key, ...args) {
    const target = this.cache[key];
    if (target) {
      target.forEach((fn) => {
        fn(...args);
      });
    } else {
      if (!this.offlineCache[key]) {
        this.offlineCache[key] = [];
      }
      this.offlineCache[key].push(() => {
        this.trigger(key, ...args);
      });
    }
  },
  remove(key, fn) {
    const target = this.cache[key];
    if (target) {
      target.forEach((value, index) => {
        if (value === fn) {
          target.splice(index, 1);
        }
      });
    }
  },
};

// const handler = (msg) => {
//   console.log("1收到来自pub的消息：", msg);
// };
// pubSub.listen("1", handler);

// pubSub.listen("2", (msg) => {
//   console.log("2收到来自pub的消息：", msg);
// });

// pubSub.remove("1", handler);
// pubSub.trigger("1", "通知1");
// pubSub.trigger("2", "通知2");

// 维持一个offlineCache，实现先发布后订阅的需求，此时第一个key的回调依旧可以顺利拿到通知
pubSub.trigger("1", "一号通知");
pubSub.trigger("1", "补充一号通知");
pubSub.trigger("1", "再次一号通知");

pubSub.listen("1", (msg) => {
  console.log(msg);
});
