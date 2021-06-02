// 利用状态模式实现灯的状态切换

// 单独定义状态，每个状态的逻辑在状态里
// context类中保存所有状态，并将本次点击请求委托给当前状态
// 状态内部执行相关的逻辑
// 此时若有新状态加入，只需要添加对应的状态类即可

// 状态模式，将状态封装成对立的类，将请求委托给当前状态对象
// 从客户的角度看，对象在不同的状态表现出不同的行为

interface LightState {
  btnPress(): void;
}

class OffState implements LightState {
  light: Light;
  constructor(light: Light) {
    this.light = light;
  }

  btnPress() {
    console.log("soft");
    this.light.setState(this.light.softState);
  }
}

class SoftState implements LightState {
  light: Light;
  constructor(light: Light) {
    this.light = light;
  }

  btnPress() {
    console.log("strong");
    this.light.setState(this.light.strongState);
  }
}

class StrongState implements LightState {
  light: Light;
  constructor(light: Light) {
    this.light = light;
  }

  btnPress() {
    console.log("off");
    this.light.setState(this.light.offState);
  }
}

class Light {
  state: LightState;
  readonly offState: OffState;
  readonly softState: SoftState;
  readonly strongState: StrongState;
  private button: HTMLButtonElement;

  constructor() {
    // 传入当前对象初始化
    this.offState = new OffState(this);
    this.softState = new SoftState(this);
    this.strongState = new StrongState(this);
    this.state = this.offState;
    this.button = null;
  }

  init() {
    const btn = document.createElement("button");
    btn.innerHTML = "switch";
    this.button = document.body.appendChild(btn);

    this.button.onclick = () => {
      // 将请求委托给当前对象
      this.state.btnPress();
    };
  }

  setState(newState: LightState) {
    this.state = newState;
  }
}
