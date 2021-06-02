// 利用中介者模式可以优雅的进行功能的扩展
// 每个玩家都不知道其他玩家的存在，通过与中介者的通信
// 完成相关的功能交互
// 只需要扩展中介者对象即可扩展功能

const playerDirector = (function () {
  const players = {}; //分team保存
  const opts = {};

  opts.addPlayer = function (player) {
    const { teamColor } = player;
    players[teamColor] = players[teamColor] ?? [];
    players[teamColor].push(player);
  };

  opts.removePlayer = function (player) {
    const { teamColor } = player;
    const target = players[teamColor];

    target.splice(
      target.findIndex((p) => p === player),
      1
    );
  };

  opts.changeTeam = function (player, newTeamColor) {
    opts.removePlayer(player);
    player.teamColor = newTeamColor;
    opts.addPlayer(player);
  };

  opts.playerDead = function (player) {
    player.state = "dead";
    let allDead = true;
    const teamColor = player.teamColor,
      teamPlayers = players[teamColor];

    for (let i = 0; i < teamPlayers.length; i++) {
      if (teamPlayers[i].state !== "dead") {
        allDead = false;
        break;
      }
    }

    if (allDead) {
      end(teamColor);
    }
  };

  function end(teamColor) {
    Object.entries(players).forEach(([key, value]) => {
      if (key === teamColor) {
        value.forEach((p) => {
          p.lose();
        });
      } else {
        value.forEach((p) => {
          p.win();
        });
      }
    });
  }

  const receiveMsg = (...args) => {
    const opt = args.shift();
    opts[opt](...args);
  };

  return {
    receiveMsg,
  };
})();

class Player {
  constructor(name, teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.state = "alive";
  }
  win() {
    console.log("winner: " + this.name);
  }
  lose() {
    console.log("loser: " + this.name);
  }
  die() {
    playerDirector.receiveMsg("playerDead", this);
  }
  changeTeam(newColor) {
    playerDirector.receiveMsg("changeTeam", this, newColor);
  }
  removePlayer() {
    playerDirector.receiveMsg("removePlayer", this);
  }
}

function playerFactory(name, teamColor) {
  const p = new Player(name, teamColor);
  playerDirector.receiveMsg("addPlayer", p);
  return p;
}

const p1 = playerFactory("one", "red"),
  p2 = playerFactory("two", "red"),
  p3 = playerFactory("three", "red"),
  p4 = playerFactory("four", "red");

const p5 = playerFactory("five", "pink"),
  p6 = playerFactory("six", "pink"),
  p7 = playerFactory("seven", "pink"),
  p8 = playerFactory("eight", "pink");

// p1.die();
// p2.die();
// p3.die();
// p4.die();

// p1.removePlayer();
// p2.removePlayer();
// p3.die();
// p4.die();

p1.removePlayer();
p2.changeTeam("pink");
p3.die();
p4.die();
