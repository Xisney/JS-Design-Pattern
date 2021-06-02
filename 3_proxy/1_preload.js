// 代理-中间件，中间处理再交给目标对象
// 保护代理与虚拟代理
// 代理的意义，单一职责原则，产出高质量的代码，高内聚，低耦合

const myImage = (function () {
  const img = document.createElement("img");
  document.body.appendChild(img);
  return {
    setSrc(src) {
      img.src = src;
    },
  };
})();

const proxyImage = (function () {
  const img = new Image();
  img.onload = () => {
    myImage.setSrc(img.src);
  };
  return {
    setSrc(src) {
      myImage.setSrc(
        "https://cdn.pixabay.com/photo/2016/07/04/01/44/mountain-world-1495832__340.jpg"
      );
      setTimeout(() => {
        img.src = src;
      }, 2000);
    },
  };
})();
