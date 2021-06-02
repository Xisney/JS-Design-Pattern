// 命令模式的命令指的是一个执行某些特定事情的指令
// 常见的应用场景，有时候需要向某些对象发送请求，但并不知道具体的接收者
// 也不知道具体操作，此时封装一个命令对象使得发送者和接收者能够解耦
// 在js中可以用高阶函数方便的实现命令模式
// 在js中命令模式已经融入！

class Command {
  constructor(receiver) {
    this.receiver = receiver;
  }
  execute() {
    this.receiver.do();
  }
}
