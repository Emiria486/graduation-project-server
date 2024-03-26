/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 09:10:33
 * @LastEditTime: 2024-03-26 11:58:11
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\OrderFood.ts
 * @Description: 订单中菜品数量的实体类
 */
export default class OrderFood {
   order_id: number = 0
   food_id2: number
   number: number

  public get_order_id(): number {
    return this.order_id
  }

  public set_order_id(_order_id: number): void {
    this.order_id = _order_id
  }

  public get_food_id2(): number {
    return this.food_id2
  }

  public set_food_id2(_food_id2: number): void {
    this.food_id2 = _food_id2
  }

  public get_number(): number {
    return this.number
  }

  public set_number(_number: number): void {
    this.number = _number
  }

  constructor(food_id2: number, number: number, order_id?: number) {
    if (order_id) {
      this.order_id = order_id
      this.food_id2 = food_id2
      this.number = number
    } else {
      this.food_id2 = food_id2
      this.number = number
    }
  }
}
