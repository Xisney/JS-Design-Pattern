// 状态模式与策略模式
// 策略模式中各个策略是平等又平行的，没有任何联系
// 状态模式的状态是有联系的，一个状态需要来自于上一个状态

// 前面的例子是模拟面向对象的写法，在ts(js)中可以直接利用call来委托

const FSM = {
  off: {
    btnPress() {
      console.log("on");
      this.setState(FSM.on);
    },
  },
  on: {
    btnPress() {
      console.log("off");
      this.setState(FSM.off);
    },
  },
};

class Light {
  private curState: { btnPress(): void };
  button: HTMLButtonElement;
  constructor() {
    this.curState = FSM.off;
    this.button = null;
  }
  init() {
    const btn = document.createElement("button");
    btn.innerHTML = "switch";
    this.button = document.body.appendChild(btn);

    this.button.onclick = () => {
      // 利用call将当前对象委托执行
      this.curState.btnPress.call(this);
    };
  }

  setState(newState: { btnPress(): void }) {
    this.curState = newState;
  }
}
