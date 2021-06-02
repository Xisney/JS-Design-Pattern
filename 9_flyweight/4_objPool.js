// 对象池-共享资源
// 创建出的对象保存在外部数组中，之后通过回收存储在对象池
class TooltipFactory {
  static pool = [];
  create() {
    const target = TooltipFactory.pool;
    if (target.length === 0) {
      const dom = document.createElement("div");
      document.body.appendChild(dom);
      return dom;
    } else {
      return target.shift();
    }
  }
  recover(obj) {
    return TooltipFactory.pool.push(obj);
  }
}

const test = new TooltipFactory();
const arr = [];

const targets = ["a", "b", "c"];
for (let i = 0; i < targets.length; i++) {
  const dom = test.create();
  dom.innerHTML = targets[i];
  arr.push(dom);
}

arr.forEach((el) => {
  test.recover(el);
});
