// 使用hook来控制一些特异性的子类
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
  customAdd() {
    // 默认添加
    return true;
  }
  // 模板方法，封装具体的逻辑框架
  init() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customAdd()) {
      this.addCondiments();
    }
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
  customAdd() {
    return false;
  }
}

const coffee = new Coffee();
const tea = new Tea();
coffee.init();
tea.init();
