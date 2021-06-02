// 简单实现，利用一个公用的变量存储实例，若已经初始化
// 则直接返回，否则就初始化，保证只是实例化一次
// 使用者必须知道这是一个单例类（缺点），不能使用new创建
class Person {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log("my name is " + this.name);
  }

  static instance = null;

  static createIns(name) {
    if (!this.instance) {
      this.instance = new Person(name);
    }
    return this.instance;
  }
}

const p1 = Person.createIns("Jack");
const p2 = Person.createIns("Cindy");

p1.speak();
p2.speak();
