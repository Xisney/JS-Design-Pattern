// 策略模式，定义一系列算法，将算法的实现和使用隔离(函数)
// 核心思想：定义一系列算法，将它们封装起来，并且可以相互替换
// 至少应有两类，一是策略类，封装一系列算法
// 一是环境类，接受请求，并将其实现委托给策略类中的一个策略
// 封装一系列算法(定义一系列策略)

// 普通面向对象语言的策略模式
class PerformanceS {
  calc(salary) {
    return salary * 4;
  }
}
class PerformanceA {
  calc(salary) {
    return salary * 3;
  }
}
class PerformanceB {
  calc(salary) {
    return salary * 2;
  }
}
class PerformanceC {
  calc(salary) {
    return salary;
  }
}

// 定义环境类
class Bonus {
  constructor() {
    this.baseSalary = null;
    this.strategy = null;
  }
  setBase(base) {
    this.baseSalary = base;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  // 将请求委托给相应的策略
  getBonus() {
    if (!this.strategy) {
      throw new Error("strategy is required");
    }
    return this.strategy.calc(this.baseSalary);
  }
}

const bonus = new Bonus();

bonus.setBase(20000);
bonus.setStrategy(new PerformanceS());

console.log(bonus.getBonus());

bonus.setStrategy(new PerformanceA());
console.log(bonus.getBonus());
