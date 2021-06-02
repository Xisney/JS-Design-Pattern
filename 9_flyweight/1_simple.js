// 享元模式，一种用于性能优化的模式
// 享元模式的核心技术是利用共享技术来有效支持大量细粒度的对象
// 将对象的属性分为内部属性与外部属性，内外属性结合构成完整的对象
// 内部属性为可以共享的属性，外部属性为每一个对象特有的属性
// 享元模式的目标是尽量减少共享对象的数量
// 关键在于如何划分内外部对象，是否可以被共享？是否在当前环境下不改变？

// 普通情况
class Model {
  constructor(sex, underwear) {
    this.sex = sex;
    this.underwear = underwear;
  }
  takePhoto() {
    console.log(`sex ${this.sex} underwear ${this.underwear}`);
  }
}

function run50(callback) {
  for (let i = 0; i < 50; i++) {
    callback(i);
  }
}

run50((i) => {
  const model = new Model("male", "underwear" + i);
  model.takePhoto();
});

run50((i) => {
  const model = new Model("female", "underwear" + i);
  model.takePhoto();
});

// 优化
// 提取公共属性为内部状态，内部状态组合的个数，即为对象的个数
// 此时仅需要两个对象
class ModelBetter {
  constructor(sex) {
    this.sex = sex;
  }
  takePhoto() {
    console.log(`sex ${this.sex} underwear ${this.underwear}`);
  }
}

const female = new ModelBetter("female");
const male = new ModelBetter("male");

run50((i) => {
  male.underwear = "underwear" + i;
  male.takePhoto();
});

run50((i) => {
  female.underwear = "underwear" + i;
  female.takePhoto();
});
