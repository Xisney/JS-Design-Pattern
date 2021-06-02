// 常规的文件上传，每一个文件都需要创建一个对象
// 若选择的文件过多，会造成新建过多的对象，导致浏览器假死
// 可以利用享元模式，将上传类型视作内部属性，name，size为外部属性
// 此时仅需要创建两个对象，但是会多出组装对象的步骤
// 实则是以时间换空间

let id = 0;

class Upload {
  constructor(uploadType, fileName, fileSize) {
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    // 保存dom
    this.dom = null;
  }
  // 加入html中
  init(id) {
    this.id = id;
    this.dom = document.createElement("div");
    this.dom.innerHTML = `<span>文件名:${this.fileName} 文件大小:${this.fileSize}</span><button class="delBtn">删除</button>`;
    document.body.insertAdjacentElement("afterbegin", this.dom);
    this.dom.querySelector(".delBtn").addEventListener("click", () => {
      this.delFile();
    });
  }
  delFile() {
    if (this.fileSize < 3000) {
      this.dom.parentElement.removeChild(this.dom);
    } else {
      if (confirm("confirm?")) {
        this.dom.parentElement.removeChild(this.dom);
      }
    }
  }
}

function startUpload(uploadType, files) {
  files.forEach(({ fileName, fileSize }) => {
    const uploadObj = new Upload(uploadType, fileName, fileSize);
    uploadObj.init(id++);
  });
}

startUpload("plugin", [
  { fileName: "1.txt", fileSize: 1000 },
  { fileName: "2.html", fileSize: 3000 },
  { fileName: "3.txt", fileSize: 5000 },
]);

startUpload("flash", [
  { fileName: "4.txt", fileSize: 1000 },
  { fileName: "5.html", fileSize: 3000 },
  { fileName: "6.txt", fileSize: 5000 },
]);
