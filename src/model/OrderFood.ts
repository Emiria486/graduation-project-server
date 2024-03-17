/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 09:10:33
 * @LastEditTime: 2024-03-17 09:12:34
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\OrderFood.ts
 * @Description: 订单中菜品数量的实体类
 */
export default class OrderFood {
  private _order_id: number
  private _food_id2: number
  private _number: number

  public get_order_id(): number {
    return this._order_id
  }

  public set_order_id(_order_id: number): void {
    this._order_id = _order_id
  }

  public get_food_id2(): number {
    return this._food_id2
  }

  public set_food_id2(_food_id2: number): void {
    this._food_id2 = _food_id2
  }

  public get_number(): number {
    return this._number
  }

  public set_number(_number: number): void {
    this._number = _number
  }

  constructor(order_id: number, food_id2: number, number: number) {
    this._order_id = order_id
    this._food_id2 = food_id2
    this._number = number
  }
}
