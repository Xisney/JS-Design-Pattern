// 在JavaScript中的策略模式
// 上一个实现，让策略诞生于对象，实则js中函数也是对象，可以直接将其定义为函数
// 同样，环境类也可以是个函数
// 本质上，只要将算法的实现和使用分开即可
// 封装好对应的策略，根据环境的不同，进行不同的委托
const strategies = {
  S(salary) {
    return 4 * salary;
  },
  A(salary) {
    return 3 * salary;
  },
  B(salary) {
    return 2 * salary;
  },
};

function getBonus(level, base) {
  return strategies[level](base);
}

console.log(getBonus("S", 20000));
console.log(getBonus("A", 20000));
console.log(getBonus("B", 20000));
