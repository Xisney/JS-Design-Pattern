// 迭代器模式是一种相对简单的模式,简单到甚至可以认为它不是模式
// 迭代器基本绝大多数语言都有内置

// 第一次运行时next时会调用函数,直接运行则不会
// yield 会保存函数运行的上下文
function* test() {
  console.log("run");
  for (let i = 0; i < 3; i++) {
    yield i;
  }
}

for (let i of test()) {
  console.log(i);
}

Array.prototype.myForEach = function (fn) {
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr) === false) {
      break;
    }
  }
};
