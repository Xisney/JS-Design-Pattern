// 透明的单例模式，像普通类一样直接new进行创建
// 可扩展性不佳，控制单例的逻辑耦合在构造函数中
// 不符合单一职责原则，若之后不需要单例，需要更改构造函数的相关逻辑
class Person {
  constructor(name) {
    if (Person.instance) {
      return Person.instance;
    }
    this.name = name;
    return (Person.instance = this);
  }

  speak() {
    console.log("my name is " + this.name);
  }

  static instance = null;
}

const p1 = new Person("Jack");
const p2 = new Person("Roy");

p1.speak();
p2.speak();
console.log(p1 === p2);
