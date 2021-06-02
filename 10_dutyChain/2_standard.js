var Chain = /** @class */ (function () {
    function Chain(fn) {
        this.fn = fn;
        this.nextNode = null;
    }
    Chain.prototype.setNext = function (next) {
        return (this.nextNode = next);
    };
    Chain.prototype.passRequest = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var res = this.fn.apply(this, args);
        if (res === "nextNode") {
            return this.nextNode && (_a = this.nextNode).passRequest.apply(_a, args);
        }
        return res;
    };
    return Chain;
}());
function order500(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log("level 500");
    }
    else {
        return "nextNode";
    }
}
function order200(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log("level 200");
    }
    else {
        return "nextNode";
    }
}
function orderNormal(orderType, pay, stock) {
    if (stock > 0) {
        console.log("done");
    }
    else {
        return null;
    }
}
var chain1 = new Chain(order500);
var chain2 = new Chain(order200);
var chain3 = new Chain(orderNormal);
chain1.setNext(chain2);
chain2.setNext(chain3);
chain1.passRequest(1, true, 500);
chain1.passRequest(2, true, 400);
chain1.passRequest(3, true, 300);
