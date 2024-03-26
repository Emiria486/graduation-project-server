/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:31:33
 * @LastEditTime: 2024-03-26 11:50:51
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Order.ts
 * @Description: 头部注释配置模板
 */
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:31:33
 * @LastEditTime: 2024-03-26 11:43:50
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Order.ts
 * @Description: 订单实体类
 */
export default class Order {
   order_id: number = 0 //mysql 数据库里面设置了id自增，所以为了避免在构造函数里面手动添加id值，直接使用默认赋值
   user_id: number
   user_phone: string
   status: boolean
   create_time: string
   order_type: number
   price: number
   discount: number
   address: string

  public get_order_id(): number {
    return this.order_id
  }

  public set_order_id(order_id: number): void {
    this.order_id = order_id
  }

  public get_user_id(): number {
    return this.user_id
  }

  public set_user_id(user_id: number): void {
    this.user_id = user_id
  }

  public get_user_phone(): string {
    return this.user_phone
  }

  public set_user_phone(user_phone: string): void {
    this.user_phone = user_phone
  }

  public get_status(): boolean {
    return this.status
  }

  public set_status(status: boolean): void {
    this.status = status
  }

  public get_create_time(): string {
    return this.create_time
  }

  public set_create_time(_create_time: string): void {
    this.create_time = _create_time
  }

  public get_order_type(): number {
    return this.order_type
  }

  public set_order_type(_order_type: number): void {
    this.order_type = _order_type
  }

  public get_price(): number {
    return this.price
  }

  public set_price(_price: number): void {
    this.price = _price
  }

  public get_discount(): number {
    return this.discount
  }

  public set_discount(_discount: number): void {
    this.discount = _discount
  }

  public get_address(): string {
    return this.address
  }

  public set_address(_address: string): void {
    this.address = _address
  }

  constructor(
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
      this.order_id = order_id
      this.user_id = user_id
      this.user_phone = user_phone
      this.status = status
      this.create_time = create_time
      this.order_type = order_type
      this.price = price
      this.discount = discount
      this.address = address
    } else {
      this.user_id = user_id
      this.user_phone = user_phone
      this.status = status
      this.create_time = create_time
      this.order_type = order_type
      this.price = price
      this.discount = discount
      this.address = address
    }
  }
}
