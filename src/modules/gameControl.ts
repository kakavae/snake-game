// 游戏控制器，控制所有的类
import Food from "./food";
import Snack from "./snack";
import Score from "./score";

export default class GameControl {
  snack: Snack = new Snack()
  score: Score = new Score()
  food: Food = new Food()
  // 键盘按下事件，决定当前方向
  direction: string;
  // 用来控制是否结束游戏的属性
  isLive: boolean = true;
  constructor() {
    this.direction = ''
  }

  // 键盘按下事件的回调
  changeDirection(event: any) {
    // console.log(event.key)
    // ArrowUp ArrowDown ArrowLeft ArrowRight
    this.direction = event.key
  }

  // 1.调用以后游戏开始
  init() {
    // 监听键盘按下事件，修改方向
    document.addEventListener('keyup', this.changeDirection.bind(this))
    this.run()
  }

  // 2.负责蛇的运动
  run() {
    // 2.1根据当前按下键值的不同，修改蛇的移动方向
    let X = this.snack.X
    let Y = this.snack.Y
    switch (this.direction) {
      case 'ArrowUp':
        Y -= 10
        break;
      case 'ArrowDown':
        Y += 10
        break;
      case 'ArrowLeft':
        X -= 10
        break;
      case 'ArrowRight':
        X += 10
        break;
    }

    // 2.3检查是否吃到食物
    this.checkFood()  // 将吃到食物动作在蛇移动之前，这样食物不会初始化在左上角显示
    // 如果写在蛇移动之前，只有在下次移动之后才会检测到新添加进去的食物

    // 2.2蛇撞墙的处理
    try {
      this.snack.X = X
      this.snack.Y = Y
    } catch (e: any) {
      alert(e.message)
      // 要停止延迟递归，蛇停止运动
      this.isLive = false
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.score.level - 1) * 30)
  }

  // 3.负责检查食物是否吃到了
  checkFood() {
    if (this.food.x === this.snack.X && this.food.y === this.snack.Y) {
      // 坐标重合，吃到食物
      this.score.changeScore()
      this.snack.addBody()
      this.food.changeFood()
    }
  }
}