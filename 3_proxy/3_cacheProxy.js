// 缓存代理，缓存已经计算过的结果或已经请求过的数据
// 如，一个运算量较大的计算函数，或者分页的请求(保存对应界面的数据)

// 原始函数
function mult(...args) {
  return args.reduce((pre, value) => {
    return pre * value;
  }, 1);
}

function sum(...args) {
  console.log("sum");
  return args.reduce((pre, value) => {
    return pre + value;
  });
}

// 代理函数
const proxyCacheMult = (function () {
  const cache = {};
  return (...args) => {
    const key = args.join(",");
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }

    return (cache[key] = mult(...args));
  };
})();

console.log(proxyCacheMult(1, 2));
console.log(proxyCacheMult(1, 2, 3));
console.log(proxyCacheMult(1, 2, 3));
console.log(proxyCacheMult(1, 2, 2));

// -----------------------------------------
// 利用工厂函数直接生成缓存代理函数
function cacheFactory(fn) {
  const cache = {};
  return (...args) => {
    const key = args.join(",");
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }

    return (cache[key] = fn(...args));
  };
}

const proxySum = cacheFactory(sum);

console.log(proxySum(1, 2));
console.log(proxySum(1, 2));
