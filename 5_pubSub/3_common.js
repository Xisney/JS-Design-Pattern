// 封装pubSub
const pubSub = {
  subList: {},
  listen(key, fn) {
    if (!this.subList[key]) {
      this.subList[key] = [];
    }
    this.subList[key].push(fn);
  },
  trigger(key, ...args) {
    const list = this.subList[key];
    if (list) {
      list.forEach((fn) => {
        fn(...args);
      });
    }
  },
};

// 将功能动态进行安装，(插件？？？
function install(obj) {
  Object.entries(pubSub).forEach(([key, value]) => {
    obj[key] = value;
  });
}

const test = {};

install(test);

test.listen("1", (msg) => {
  console.log("收到1类事件的通知", msg);
});

test.trigger("1", "hhh");
