/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:57:42
 * @LastEditTime: 2024-03-16 23:02:32
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Coupon.ts
 * @Description: 优惠劵实体类
 */
export default class Coupon {
  private _coupon_id: number
  private _title: string
  private _discount: number
  private _limit: number
  private _create_time: string
  private expirein: number

  public get_coupon_id(): number {
    return this._coupon_id
  }

  public set_coupon_id(_coupon_id: number): void {
    this._coupon_id = _coupon_id
  }

  public get_title(): string {
    return this._title
  }

  public set_title(_title: string): void {
    this._title = _title
  }

  public get_discount(): number {
    return this._discount
  }

  public set_discount(_discount: number): void {
    this._discount = _discount
  }

  public get_limit(): number {
    return this._limit
  }

  public set_limit(_limit: number): void {
    this._limit = _limit
  }

  public get_create_time(): string {
    return this._create_time
  }

  public set_create_time(_create_time: string): void {
    this._create_time = _create_time
  }

  public getExpirein(): number {
    return this.expirein
  }

  public setExpirein(expirein: number): void {
    this.expirein = expirein
  }

  constructor(
    coupon_id: number,
    title: string,
    discount: number,
    limit: number,
    create_time: string,
    expirein: number
  ) {
    this._coupon_id = coupon_id
    this._title = title
    this._discount = discount
    this._limit = limit
    this._create_time = create_time
    this.expirein = expirein
  }
}
