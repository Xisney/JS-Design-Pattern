// 装饰器模式可以动态的给对象添加一些额外的职责，不会影响从这个类派生出的其他对象
// 对象动态的增加职责，装饰着模式能够在不改变对象基础上，动态的增添功能

// 不断的包装，不断的装饰
// 装饰者模式将一个对象嵌入另一个对象中，实际相当于这个对象被另外一个对象包装起来
// 形成一条包装链，请求沿着这条链传递到所有对象

// 飞机升级
class Plane {
  fire() {
    console.log("发射子弹");
  }
}

class MissleDecorator {
  constructor(plane) {
    this.plane = plane;
  }
  fire() {
    this.plane.fire();
    console.log("发射导弹");
  }
}

class AtomDecorator {
  constructor(plane) {
    this.plane = plane;
  }
  fire() {
    this.plane.fire();
    console.log("发射原子弹");
  }
}

let plane = new Plane();
// update
plane = new MissleDecorator(plane);
// update again
plane = new AtomDecorator(plane);

plane.fire();
