// 设置蛇的类
export default class Snack {
  // 囊括蛇全体的盒子
  snacks: HTMLElement;
  // 表示蛇头的元素
  head: HTMLElement;
  // 设置蛇的身体，包括蛇头
  bodies: HTMLCollection; // 初始化就有头在里面

  constructor() {
    this.snacks = document.querySelector('#snack') as HTMLElement;
    this.head = document.querySelector('#snack > div') as HTMLElement;
    this.bodies = this.snacks.getElementsByTagName('div') as HTMLCollection;
  }

  // 获取蛇头坐标
  get X() {
    return this.head.offsetLeft;
  }
  // 获取蛇头的坐标
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的坐标
  set X(value: number) {
    // 1.如果蛇头碰到了边界就抛出异常
    if (this.X === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了");
    }

    // 2.禁止蛇掉头---如果要设置的新的值等于身体的第二段位置(没设置新的值的时候这个值还是头的位置，bodies[1]就是头)，就说明调头了-----第0个位置才是头的位置，第一个位置就是身体的位置
    if (this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetLeft) {
      if (value > this.X) {
        value = this.X - 10; // 向右调头
      } else {
        value = this.X + 10; // 向左调头
      }
    }

    // 3.在将蛇头的坐标改为最新的值的时候，让身体的坐标发生改变，因为身体坐标变化的时候依赖着上一次头（第一段身体的变化）
    this.moveBody();
    this.head.style.left = value + 'px';
    this.checkHeadBody()
  }
  set Y(value: number) {
    // 如果蛇头碰到了边界就抛出异常
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了");
    }

    if (this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetTop) {
      if (value > this.Y) {
        value = this.Y - 10; // 向上调头
      } else {
        value = this.Y + 10; // 向下调头
      }
    }

    this.moveBody();
    this.head.style.top = value + 'px';
    // 蛇头运动到最新的位置之后才去检查是否撞到，并根据是否撞到结束游戏
    this.checkHeadBody()
  }

  // 蛇增加身体长度的方法---实际上是增加一个div元素
  addBody() {
    this.snacks.append(document.createElement('div'));
  }

  // 移动蛇的身体的方法
  moveBody() {
    // 蛇的身体存储在bodies中
    // 1.方法：让蛇的后一段身体和前一段身体的坐标保持一致，每一段身体都是这样，从后向前面遍历
    if (this.bodies.length > 1) {
      for (let i = this.bodies.length - 1; i > 0; i--) {
        (this.bodies[i] as HTMLElement).style.left = (this.bodies[i - 1] as HTMLElement).offsetLeft + 'px';
        (this.bodies[i] as HTMLElement).style.top = (this.bodies[i - 1] as HTMLElement).offsetTop + 'px';
      }
    }
  }

  // 检查蛇是否撞到了自己的身体的方法
  checkHeadBody() {
    // 遍历蛇的整个身体，检查头的坐标是否和身体的坐标有重合，重合说明撞到了
    for (let i = 1; i < this.bodies.length; i++) {
      if (this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
        throw new Error('撞到自己了')
      }
    }
  }
}