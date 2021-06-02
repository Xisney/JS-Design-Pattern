// js中装饰者

const plane = {
  fire() {
    console.log("发射子弹");
  },
};

const missleDecorator = () => {
  console.log(2);
};

const atomDecorator = () => {
  console.log(3);
};

const f1 = plane.fire;

plane.fire = () => {
  f1(); // 直接调用会无限递归
  missleDecorator();
  atomDecorator();
};

plane.fire();
