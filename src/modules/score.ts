// 2.定义记分牌的类
export default class Score {
  score: number = 0;
  level: number = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  upperScore: number;
  maxLevel: number;

  constructor(toUpper = 10, toMaxLevel = 10) {
    this.scoreEle = document.getElementById('score') as HTMLElement;
    this.levelEle = document.getElementById('level') as HTMLElement;
    this.upperScore = toUpper;
    this.maxLevel = toMaxLevel;
  }

  // 1.改变得分的方法
  changeScore() {
    this.scoreEle.innerHTML = ++this.score + '';
    // 每十分升一级
    if (this.score % 10 === 0) {
      this.changeLevel()
    }
  }

  // 2.改变等级的方法
  changeLevel() {
    // 升到10级之后就不许再升级了
    if (this.level <= this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}