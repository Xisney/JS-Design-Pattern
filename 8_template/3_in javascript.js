// 不使用继承完成模板方法（通过高阶函数

const Beverage = function (params) {
  const boilWater = () => {
    console.log("烧水");
  };
  const brew =
    params.brew ||
    function () {
      throw new Error("wrong! give brew func");
    };

  const needBrew =
    params.needBrew ||
    function () {
      return true;
    };

  // 其他方法类似，通过参数获取，通过内部定义函数进行判断是否提供必要的函数
  // 其他实现略......
  class F {
    // 封装模板方法
    init() {
      boilWater();
      if (needBrew()) {
        brew();
      }
    }
  }

  return F;
};

const Coffee = Beverage({
  brew() {
    console.log("brew");
  },
  needBrew() {
    return false;
  },
});

new Coffee().init();
