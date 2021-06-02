abstract class Beverage {
  boilWater() {
    console.log("烧水");
  }
  abstract brew(): void;
  abstract pourInCup(): void;
  abstract addCondiments(): void;
}

class Coffee extends Beverage {
  brew() {
    console.log("1");
  }
  pourInCup() {
    console.log(2);
  }
  addCondiments() {
    console.log(3);
  }
}
