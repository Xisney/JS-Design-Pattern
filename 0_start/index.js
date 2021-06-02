// 高阶函数，返回值或者参数为一个函数
// currying
const currying = function (fn) {
  let arg = [];
  return function curried(..._arg) {
    if (_arg.length === 0) {
      return fn(...arg);
    } else {
      arg.push(..._arg);
      return curried;
    }
  };
};

function sum(...arg) {
  return arg.reduce((pre, value) => pre + value);
}

const cSum = currying(sum);
console.log(cSum(1)(2)(3)(4)(5, 6)());

// time chunk 分批次加载
function timechunk(arr, fn, count = 5) {
  let flag = { timer: null };

  const run = () => {
    arr.splice(0, count).forEach((el) => {
      fn(el);
    });
    flag.timer = setTimeout(() => {
      run();
    }, 500);
  };

  run();
  return flag;
}
