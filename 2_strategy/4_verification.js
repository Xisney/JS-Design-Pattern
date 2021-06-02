// 表单验证，基本的模式为在表单回调函数中使用if-else语句
// 进行判断逻辑，然后决定是否提交，此种模式将算法的实现和使用混合在一起
// 不利于扩展，不具有复用性

// 使用策略模式实现表单验证
// 定义策略类
const strategy = {
  isNonEmpty(value, errMsg) {
    if (value == "") {
      return errMsg;
    }
  },
  minLength(value, len, errMsg) {
    if (value.length < len) {
      return errMsg;
    }
  },
  isMobile(value, errMsg) {
    if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
      return errMsg;
    }
  },
};

// 定义环境类
class Validator {
  constructor() {
    this.cache = [];
  }

  add(dom, rule, errMsg) {
    rule = rule.spilt(":");

    this.cache.push(function () {
      const key = rule.shift();
      rule.unshift(dom.value);
      rule.push(errMsg);
      return strategy[key](...rule);
    });
  }

  start() {
    for (let i = 0; i < this.cache.length; i++) {
      const res = this.cache[i]();
      if (res) {
        return res;
      }
    }
  }
}

function validateFn() {
  const validator = new Validator();

  // 添加校验规则
  validator.add(dom1, "isNonEmpty", "不允许为空");
  validator.add(dom2, "minLength:6", "长度最小为6");
  validator.add(dom3, "isMobile", "手机号不合法");

  return validator.start();
}

validateFn();
