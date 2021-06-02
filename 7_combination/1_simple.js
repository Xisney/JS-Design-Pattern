// 组合模式，用小的子对象来构建更大的对象
// 将对象组合成部分-整体的层次结构，树状
// 请求从树的顶端向下传递，用户不知道这是不是叶对象或组合对象
// 类似于DFS
// 请求从上到下沿着树传递，知道尽头，客户不需要知道当前对象是否为组合对象
// 请求就会到达所有对象

// 基本对象可以被组合成更复杂的组合对象，组合对象又可以被组合
// 这样不断递归下去，这棵树的结构可以支持任意多的复杂度
// 在树碑构造完成之后，只需要调用最顶层的方法即可执行整棵树
// 每次执行，都是一次深度优先搜索

// 宏命令
class MacroCommand {
  constructor() {
    this.commandList = [];
  }
  add(command) {
    this.commandList.push(command);
  }
  execute() {
    this.commandList.forEach((cmd) => {
      cmd.execute();
    });
  }
}

const openAcCmd = {
  execute() {
    console.log("open AC");
  },
};

const openTvCmd = {
  execute() {
    console.log("open Tv");
  },
};

const openSoundCmd = {
  execute() {
    console.log("open Sound");
  },
};

const macroCmd1 = new MacroCommand();
macroCmd1.add(openTvCmd);
macroCmd1.add(openSoundCmd);

const macroCmd = new MacroCommand();
macroCmd.add(openAcCmd);
macroCmd.add(macroCmd1);

macroCmd.execute();
