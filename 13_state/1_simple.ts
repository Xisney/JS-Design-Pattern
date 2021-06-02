// 状态模式，将状态的逻辑和上下文隔离开
// 状态模式的关键是区分事物内部的状态，事物内部状态的改变往往改变事物的行为

// 直接实现light
// 此时若灯的状态有所改变，以下代码不具有扩展性
// 如灯有强光，弱光，关灯状态

const enum stateType {
  off,
  on,
}

class Light {
  state: stateType;
  button: object;

  constructor() {
    this.state = stateType.off;
    this.button = null;
  }

  init() {
    const btn = document.createElement("button");
    btn.innerHTML = "switch";
    this.button = document.body.appendChild(btn);

    btn.onclick = () => {
      this.btnPress();
    };
  }

  btnPress() {
    if (this.state === stateType.off) {
      console.log("on");
      this.state = stateType.on;
    } else if (this.state === stateType.on) {
      console.log("off");
      this.state = stateType.off;
    }
  }
}

const light = new Light();
light.init();
