// 惰性单例模式，指的是只在需要这个对象时 才创建这个实例
// 单例模式的核心是创建一个唯一的,供全局访问的实例
// 将创建对象的逻辑和判断单例的逻辑分离

function createDiv(content = "default") {
  const div = document.createElement("div");
  div.innerHTML = content;
  // 执行相关操作
  return div;
}

function getSingle(fn) {
  let res = null;
  return (...args) => {
    return res ?? (res = fn(...args));
  };
}

const createSingleDiv = getSingle(createDiv);

const d1 = createSingleDiv("hhh");
const d2 = createSingleDiv("ggg");
console.log(d1 === d2);

// 单例模式不限于创建对象
// eg.渲染完页面中的一个列表,给此列表绑定事件,若动态的忘此列表追加数据会重复渲染
// 在使用事件委托的前提下,不想判断是否是第一次渲染,可以使用此模式
const bindEvent = getSingle(() => {
  document.querySelector("#target").onclick = function () {
    console.log("click");
  };
  return true;
});

function render() {
  console.log("render");
  bindEvent();
}

// 多次调用,响应多次,但是只绑定一次事件处理函数
render();
render();
render();
