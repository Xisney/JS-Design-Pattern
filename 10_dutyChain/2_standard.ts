interface Fn {
  (...args: any[]): any;
}

class Chain {
  private fn: Fn;
  private nextNode: Chain;

  constructor(fn: Fn) {
    this.fn = fn;
    this.nextNode = null;
  }

  setNext(next: Chain) {
    return (this.nextNode = next);
  }

  next(...args: any[]) {
    return this.nextNode && this.nextNode.passRequest(...args);
  }

  passRequest(...args: any[]) {
    const res = this.fn(...args);

    if (res === "nextNode") {
      return this.next(...args);
    }
    return res;
  }
}

function order500(orderType: number, pay: boolean, stock: number) {
  if (orderType === 1 && pay === true) {
    console.log("level 500");
  } else {
    return "nextNode";
  }
}

function order200(orderType: number, pay: boolean, stock: number) {
  if (orderType === 2 && pay === true) {
    console.log("level 200");
  } else {
    return "nextNode";
  }
}

function orderNormal(orderType: number, pay: boolean, stock: number) {
  if (stock > 0) {
    console.log("done");
  } else {
    return null;
  }
}

const chain1 = new Chain(order500);
const chain2 = new Chain(order200);
const chain3 = new Chain(orderNormal);

chain1.setNext(chain2);
chain2.setNext(chain3);

chain1.passRequest(1, true, 500);
chain1.passRequest(2, true, 400);
chain1.passRequest(3, true, 300);
