/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:57:42
 * @LastEditTime: 2024-03-26 11:47:20
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Coupon.ts
 * @Description: 优惠劵实体类
 */
export default class Coupon {
   coupon_id: number = 0 //mysql 数据库里面设置了id自增，所以为了避免在构造函数里面手动添加id值，直接使用默认赋值
   title: string
   discount: number
   limit: number
   create_time: string
   expirein: number
  constructor(
    title: string,
    discount: number,
    limit: number,
    create_time: string,
    expirein: number,
    coupon_id?: number
  ) {
    if (coupon_id) {
      this.coupon_id = coupon_id
      this.title = title
      this.discount = discount
      this.limit = limit
      this.create_time = create_time
      this.expirein = expirein
    } else {
      this.title = title
      this.discount = discount
      this.limit = limit
      this.create_time = create_time
      this.expirein = expirein
    }
  }
  public get_coupon_id(): number {
    return this.coupon_id
  }

  public set_coupon_id(_coupon_id: number): void {
    this.coupon_id = _coupon_id
  }

  public get_title(): string {
    return this.title
  }

  public set_title(_title: string): void {
    this.title = _title
  }

  public get_discount(): number {
    return this.discount
  }

  public set_discount(_discount: number): void {
    this.discount = _discount
  }

  public get_limit(): number {
    return this.limit
  }

  public set_limit(_limit: number): void {
    this.limit = _limit
  }

  public get_create_time(): string {
    return this.create_time
  }

  public set_create_time(_create_time: string): void {
    this.create_time = _create_time
  }

  public get_expirein(): number {
    return this.expirein
  }

  public set_expirein(_expirein: number): void {
    this.expirein = _expirein
  }
  public toString(): string {
    return `Coupon:${this.title}`
  }
}
