// 模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式
// 利用继承，将相同的部分以及方法的执行框架在父类中实现
// 子类仅仅实现具体的方法，父类说明所需的方法以及执行顺序
// 子类的方法种类和执行顺序都是不变的，但是方法具体的实现是可变的

// coffee and tea
// 分离共同点

class Beverage {
  boilWater() {
    console.log("把水煮沸");
  }
  // 由子类提供
  brew() {
    throw new Error("must rewrite");
  }
  pourInCup() {
    throw new Error("must rewrite");
  }
  addCondiments() {
    throw new Error("must rewrite");
  }
  // 模板方法，封装具体的逻辑框架
  init() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
}

class Coffee extends Beverage {
  brew() {
    console.log("冲泡");
  }
  pourInCup() {
    console.log("倒入杯中");
  }
  addCondiments() {
    console.log("加糖和奶");
  }
}

class Tea extends Beverage {
  brew() {
    console.log("浸泡");
  }
  pourInCup() {
    console.log("倒入茶壶中");
  }
  addCondiments() {
    console.log("加柠檬");
  }
}

const coffee = new Coffee();
const tea = new Tea();
coffee.init();
tea.init();
