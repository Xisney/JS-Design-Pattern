class ObjFactory<T> {
  static pool = [];
  private createFn: () => T;

  constructor(createFn: () => T) {
    this.createFn = createFn;
  }

  create(): T {
    const target = ObjFactory.pool;
    return target.length === 0 ? this.createFn() : target.shift();
  }
  recover(obj: T) {
    return ObjFactory.pool.push(obj);
  }
}

const test = new ObjFactory<HTMLIFrameElement>(() => {
  const iframe = document.createElement("iframe");
  document.body.insertAdjacentElement("afterbegin", iframe);
  iframe.onload = function () {
    iframe.onload = null; // 防止重复加载
    test.recover(iframe); // 回收
  };
  return iframe;
});

const iframe1 = test.create();
iframe1.src = "http://baidu.com";

const iframe2 = test.create();
iframe2.src = "http://qq.com";

// 每次加载完成就会进行回收
