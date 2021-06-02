// 利用策略模式封装一个动画函数
// 定义策略类
const methods = {
  // 动画函数，四个参数为
  // 动画已经消耗的时间，动画开始的位置，动画目标位置(变化量)，动画持续的总时间
  // 返回值为动画元素当前应当处于的位置
  linear(t, b, c, d) {
    return (c * t) / d + b;
  },
  easeIn(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
};

// 定义动画类(环境类)
class Animate {
  constructor(dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null; // 动画的属性
    this.easing = null; // 缓动函数
    this.duration = null;
  }

  start(propertyName, endPos, duration, easing) {
    this.startTime = +new Date();
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.endPos = endPos;
    this.propertyName = propertyName;
    this.easing = methods[easing];
    this.duration = duration;

    const timer = setInterval(() => {
      if (this.step() === false) {
        clearInterval(timer);
      }
    }, 18);
  }

  step() {
    const t = +new Date();
    if (t >= this.startTime + this.duration) {
      this.update(this.endPos); // 动画结束，修正最后的位置
      return false; // 结束动画
    }
    const pos = this.easing(
      t - this.startTime,
      this.startPos,
      this.endPos - this.startPos,
      this.duration
    );
    this.update(pos);
  }

  update(pos) {
    this.dom.style[this.propertyName] = pos + "px";
  }
}
