// 职责链模式，将处理请求的对象串联成链式
// 将请求在链上传递，直到有对象处理为止

// 订单分级
function order500(orderType: number, pay: boolean, stock: number) {
  if (orderType === 1 && pay === true) {
    console.log("level 500");
  } else {
    order200(orderType, pay, stock);
  }
}

function order200(orderType: number, pay: boolean, stock: number) {
  if (orderType === 2 && pay === true) {
    console.log("level 200");
  } else {
    orderNormal(stock);
  }
}

function orderNormal(stock: number) {
  if (stock > 0) {
    console.log("done");
  } else {
    console.log("wrong");
  }
}
