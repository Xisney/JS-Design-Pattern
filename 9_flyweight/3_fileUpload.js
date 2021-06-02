// 利用享元模式进行优化，将上传的类型作为内部状态
// 此时仅仅需要两个对象，通过拼凑，执行相关操作

let id = 0;

class Upload {
  constructor(uploadType) {
    this.uploadType = uploadType;
  }
  // 每次执行需要完整对象的操作的时候，再通过方法拼凑完整的对象
  // 通过工厂函数限制Upload对象实例的数量
  delUpload(id) {
    // this 传入实例对象，即享元对象
    const { dom, fileSize } = UploadManager.setExternalState(id, this);
    if (fileSize < 3000) {
      dom.parentElement.removeChild(dom);
    } else {
      if (confirm("confirm?")) {
        dom.parentElement.removeChild(dom);
      }
    }
  }
}

const uploadFactory = (function () {
  const uploadTypeCache = new Map();
  // 若只有一种类型实则为单例模式
  // 代理模式
  return {
    create(uploadType) {
      if (!uploadTypeCache.has(uploadType)) {
        uploadTypeCache.set(uploadType, new Upload(uploadType));
      }
      return uploadTypeCache.get(uploadType);
    },
  };
})();

class UploadManager {
  static dataBase = {};
  add(id, fileSize, fileName, uploadType) {
    const uploadObj = uploadFactory.create(uploadType);

    const dom = document.createElement("div");
    dom.innerHTML = `<span>文件名:${fileName} 文件大小:${fileSize}</span><button class="delBtn">删除</button>`;
    document.body.insertAdjacentElement("afterbegin", dom);
    dom.querySelector(".delBtn").addEventListener("click", () => {
      uploadObj.delUpload(id);
    });

    UploadManager.dataBase[id] = {
      fileName,
      fileSize,
      dom,
    };

    return uploadObj;
  }
  static setExternalState(id, uploadObj) {
    const target = UploadManager.dataBase[id];
    Object.keys(target).forEach((key) => {
      uploadObj[key] = target[key];
    });
    return uploadObj;
  }
}

const uploadManager = new UploadManager();

function startUpload(uploadType, files) {
  files.forEach(({ fileName, fileSize }) => {
    uploadManager.add(id++, fileSize, fileName, uploadType);
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
