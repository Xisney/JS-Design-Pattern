// 中介者模式的作用就是解除对象和对象之间的紧耦合关系
// 增加一个中介者对象，所有的相关对象都可以通过中介者对象来通信
// 而不是相互引用
// 中介者使得各个对象之间耦合松散，可以独立的改变它们之间的交互

// 下列代码并未使用中介者模式，而是将所有的敌友关系都人手一份
// 当玩家数量变多，一位玩家移除，需要遍历所有对象，挨个移除
// 在下个文件引入中介者模式改造

const players = [];

class Player {
  constructor(name, teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.partners = [];
    this.enemies = [];
    this.state = "live";
  }
  win() {
    console.log("winner: " + this.name);
  }
  lose() {
    console.log("loser: " + this.name);
  }
  die() {
    this.state = "dead";
    console.log(this.name + " died");
    let allDead = true;

    for (let i = 0; i < this.partners.length; i++) {
      if (this.partners[i].state !== "dead") {
        allDead = false;
        break;
      }
    }

    if (allDead) {
      const { enemies, partners } = this;
      this.lose();

      partners.forEach((el) => {
        el.lose();
      });
      enemies.forEach((el) => {
        el.win();
      });
    }
  }
}

function playerFactory(name, teamColor) {
  const player = new Player(name, teamColor);
  players.forEach((p) => {
    if (p.teamColor === player.teamColor) {
      player.partners.push(p);
      p.partners.push(player);
    } else {
      player.enemies.push(p);
      p.enemies.push(player);
    }
  });
  players.push(player);
  return player;
}

const p1 = playerFactory("one", "red"),
  p2 = playerFactory("two", "red"),
  p3 = playerFactory("three", "red"),
  p4 = playerFactory("four", "red");

const p5 = playerFactory("five", "pink"),
  p6 = playerFactory("six", "pink"),
  p7 = playerFactory("seven", "pink"),
  p8 = playerFactory("eight", "pink");

p1.die();
p2.die();
p3.die();
p4.die();
