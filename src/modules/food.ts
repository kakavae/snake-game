// 1.定义事务的food类，用于描述事务的属性和行为

export default class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('food') as HTMLElement;
  }

  // 返回食物当前的横纵坐标
  get x(): number {
    return this.element.offsetLeft
  }
  get y(): number {
    return this.element.offsetTop
  }

  // 每当调用方法就修改食物的位置
  changeFood(): void {
    // 生成随机的位置
    const left = Math.floor(Math.random() * 30) * 10;
    const top = Math.floor(Math.random() * 30) * 10;

    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}