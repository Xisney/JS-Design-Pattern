// 使用代理实现单例模式
// 将判断单例的逻辑转移到另一个类当中，实现逻辑分离
class Person {
  constructor(name) {
    // 可用于判定是否使用new调用，若是则为构造函数，否则为undefined
    console.log(new.target);
    this.name = name;
  }
  speak() {
    console.log(this.name);
  }
}

class ProxyCreateSinglePersonIns {
  constructor(name) {
    const ins = ProxyCreateSinglePersonIns.instance;
    if (ins) {
      return ins;
    }
    return (ProxyCreateSinglePersonIns.instance = new Person(name));
  }

  static instance = null;
}

const p1 = new Person("Jack");
const p2 = new Person("Roy");

p1.speak();
p2.speak();
console.log(p1 === p2);
