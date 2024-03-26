/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:22:19
 * @LastEditTime: 2024-03-26 18:23:38
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Food.ts
 * @Description: 菜品实体类
 */
export default class Food {
  food_id: number = 0 //mysql 数据库里面设置了id自增，所以为了避免在构造函数里面手动添加id值，直接使用默认赋值
  food_name: string
  price: number
  image: string
  status: boolean
  description: string
  isdelete: number

  public get_isdelete(): number {
    return this.isdelete
  }

  public set_isdelete(isdelete: number): void {
    this.isdelete = isdelete
  }

  public get_food_id(): number {
    return this.food_id
  }

  public set_food_id(_food_id: number): void {
    this.food_id = _food_id
  }

  public get_food_name(): string {
    return this.food_name
  }

  public set_food_name(_food_name: string): void {
    this.food_name = _food_name
  }

  public get_price(): number {
    return this.price
  }

  public set_price(_price: number): void {
    this.price = _price
  }

  public get_image(): string {
    return this.image
  }

  public set_image(_image: string): void {
    this.image = _image
  }

  public get_status(): boolean {
    return this.status
  }

  public set_status(_status: boolean): void {
    this.status = _status
  }

  public get_description(): string {
    return this.description
  }

  public set_description(_description: string): void {
    this.description = _description
  }

  constructor(
    food_name: string,
    price: number,
    image: string,
    status: boolean,
    description: string,
    isdelete: number,
    food_id?: number //将id作为可选参数
  ) {
    if (food_id) {
      //验证是否存在
      this.food_id = food_id
      this.food_name = food_name
      this.price = price
      this.image = image
      this.status = status
      this.description = description
      this.isdelete = isdelete
    } else {
      this.food_name = food_name
      this.price = price
      this.image = image
      this.status = status
      this.description = description
      this.isdelete = isdelete
    }
  }
}
