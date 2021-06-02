// 适配器就是将一个接口和另一个接口的适配
// 体感上就是数据转换

const googleMap = {
  show() {
    console.log(1);
  },
};

const baiduMap = {
  display() {
    console.log(2);
  },
};

interface MapFn {
  show(): void;
}

function render(fn: MapFn) {
  fn.show();
}

function adapter(fn: any): MapFn {
  return {
    show() {
      fn.display();
    },
  };
}

// 适配百度地图的api，以适配项目代码

render(googleMap);
render(adapter(baiduMap));
