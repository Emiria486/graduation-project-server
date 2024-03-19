/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:22:19
 * @LastEditTime: 2024-03-19 15:31:33
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Food.ts
 * @Description: 菜品实体类
 */
export default class Food {
  private _food_id: number = 0 //mysql 数据库里面设置了id自增，所以为了避免在构造函数里面手动添加id值，直接使用默认赋值
  private _food_name: string
  private _price: number
  private _image: string
  private _status: boolean
  private _description: string

  public get_food_id(): number {
    return this._food_id
  }

  public set_food_id(_food_id: number): void {
    this._food_id = _food_id
  }

  public get_food_name(): string {
    return this._food_name
  }

  public set_food_name(_food_name: string): void {
    this._food_name = _food_name
  }

  public get_price(): number {
    return this._price
  }

  public set_price(_price: number): void {
    this._price = _price
  }

  public get_image(): string {
    return this._image
  }

  public set_image(_image: string): void {
    this._image = _image
  }

  public get_status(): boolean {
    return this._status
  }

  public set_status(_status: boolean): void {
    this._status = _status
  }

  public get_description(): string {
    return this._description
  }

  public set_description(_description: string): void {
    this._description = _description
  }

  constructor(
    food_name: string,
    price: number,
    image: string,
    status: boolean,
    description: string,
    food_id?: number  //将id作为可选参数
  ) {
    if (food_id) {  //验证是否存在
      this._food_id = food_id
      this._food_name = food_name
      this._price = price
      this._image = image
      this._status = status
      this._description = description
    } else {
      this._food_name = food_name
      this._price = price
      this._image = image
      this._status = status
      this._description = description
    }
  }
}
