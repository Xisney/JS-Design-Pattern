// 利用代理降低网络发送的频率

function synchronousFile(id) {
  console.log(`开始同步文件${id}...`);
}

// 利用代理函数，面向用户的时候暴露代理函数
// 屏蔽实现的细节，对于用户而言只提供功能，不指明实现
// 使用代理完成额外的功能，例如过滤之类，但对用户而言是无感的
// 都会完成和本体一样的功能
// 实现对网络请求的节流
const proxySynchronousFile = (function () {
  const cache = [],
    delay = 1000;
  let flag = true;
  return (id) => {
    cache.push(id);
    if (flag) {
      flag = false;
      setTimeout(() => {
        while (cache.length > 0) {
          synchronousFile(cache.shift());
        }
        flag = true;
      }, delay);
    }
  };
})();

const files = document.querySelectorAll("input");

for (let i = 0; i < files.length; i++) {
  files[i].onclick = function () {
    if (this.checked) {
      proxySynchronousFile(this.id);
    }
  };
}
