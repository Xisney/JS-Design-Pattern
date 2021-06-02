// 扫描文件夹-组合模式

// 客户同等对待组合对象和叶对象，在执行操作时
// 不需要区分该对象是文件还是文件夹，通过暴露相同的接口
// 每个接口做着自己认为正确的事情
// 若要再改变整个树的结构直接添加即可，不用修改原来任何实现

// 何时使用组合模式，表示对象的部分-整体的层次结构
// 希望统一对待一棵树中的所有对象
// 相同的接口是联系以及同意对待的纽带

class Folder {
  constructor(name) {
    this.name = name;
    this.files = [];
    // 记录当前对象的父对象，便于在父节点中删除该节点
    this.parent = null;
  }
  add(file) {
    this.files.push(file);
    // 记录新添加的文件的父对象
    file.parent = this;
  }
  scan() {
    console.log("begin scan folder: " + this.name);
    this.files.forEach((file) => {
      file.scan();
    });
  }
  remove() {
    // 游离的节点或者根节点不执行操作
    if (!this.parent) {
      return;
    }

    const current = this,
      parent = this.parent;
    parent.files.forEach((el, index) => {
      if (el === current) {
        parent.files.splice(index, 1);
      }
    });
  }
}

class File {
  constructor(name) {
    this.name = name;
    this.parent = null;
  }
  add() {
    throw new Error("can't add file in file");
  }
  scan() {
    console.log("begin scan file: " + this.name);
  }
  remove() {
    if (!this.parent) {
      return;
    }

    const current = this,
      parent = this.parent;
    parent.files.forEach((el, index) => {
      if (el === current) {
        parent.files.splice(index, 1);
      }
    });
  }
}

const folder = new Folder("root");
const file1 = new File("javascript高级程序设计");
const file2 = new File("深入浅出node.js");
folder.add(file1);
folder.add(file2);

const folder1 = new Folder("music");
const file3 = new File("innocent");
folder1.add(file3);

folder.add(folder1);

folder1.remove();
file2.remove();

// 扫描整个文件树
folder.scan();
