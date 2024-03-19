/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:31:33
 * @LastEditTime: 2024-03-16 22:31:58
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Order.ts
 * @Description: 订单实体类
 */
export default class Order {
  private _order_id: number = 0 //mysql 数据库里面设置了id自增，所以为了避免在构造函数里面手动添加id值，直接使用默认赋值
  private _user_id: number
  private _user_phone: string
  private _status: boolean
  private _create_time: string
  private _order_type: number
  private _price: number
  private _discount: number
  private _address: string

  public get_order_id(): number {
    return this._order_id
  }

  public set_order_id(_order_id: number): void {
    this._order_id = _order_id
  }

  public get_user_id(): number {
    return this._user_id
  }

  public set_user_id(_user_id: number): void {
    this._user_id = _user_id
  }

  public get_user_phone(): string {
    return this._user_phone
  }

  public set_user_phone(_user_phone: string): void {
    this._user_phone = _user_phone
  }

  public get_status(): boolean {
    return this._status
  }

  public set_status(_status: boolean): void {
    this._status = _status
  }

  public get_create_time(): string {
    return this._create_time
  }

  public set_create_time(_create_time: string): void {
    this._create_time = _create_time
  }

  public get_order_type(): number {
    return this._order_type
  }

  public set_order_type(_order_type: number): void {
    this._order_type = _order_type
  }

  public get_price(): number {
    return this._price
  }

  public set_price(_price: number): void {
    this._price = _price
  }

  public get_discount(): number {
    return this._discount
  }

  public set_discount(_discount: number): void {
    this._discount = _discount
  }

  public get_address(): string {
    return this._address
  }

  public set_address(_address: string): void {
    this._address = _address
  }

  constructor(
    // order_id: number,
    user_id: number,
    user_phone: string,
    status: boolean,
    create_time: string,
    order_type: number,
    price: number,
    discount: number,
    address: string,
    order_id?: number
  ) {
    if (order_id) {
      this._order_id = order_id
      this._user_id = user_id
      this._user_phone = user_phone
      this._status = status
      this._create_time = create_time
      this._order_type = order_type
      this._price = price
      this._discount = discount
      this._address = address
    } else {
      this._user_id = user_id
      this._user_phone = user_phone
      this._status = status
      this._create_time = create_time
      this._order_type = order_type
      this._price = price
      this._discount = discount
      this._address = address
    }
  }
}
