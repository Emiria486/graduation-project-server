/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 09:03:42
 * @LastEditTime: 2024-03-19 11:40:08
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\OrderType.ts
 * @Description: 订单种类实体类
 */
export default class OrderType {
  private _order_type_id: number = 0 //mysql 数据库里面设置了id自增，所以为了避免在构造函数里面手动添加id值，直接使用默认赋值
  private _order_type: string

  public get_order_type_id(): number {
    return this._order_type_id
  }

  public set_order_type_id(_order_type_id: number): void {
    this._order_type_id = _order_type_id
  }

  public get_order_type(): string {
    return this._order_type
  }

  public set_order_type(_order_type: string): void {
    this._order_type = _order_type
  }

  constructor(order_type: string, order_type_id?: number) {
    if (order_type_id) {
      this._order_type_id = order_type_id
      this._order_type = order_type
    } else {
      this._order_type = order_type
    }
  }
}
