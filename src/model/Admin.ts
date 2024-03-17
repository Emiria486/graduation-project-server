/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 21:44:49
 * @LastEditTime: 2024-03-17 10:03:28
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Admin.ts
 * @Description: 管理员实体类
 */
export default class Admin {
  private _admin_id: number
  private _password: string
  private _username: string
  private _phone: string
  private _avatar?: string
  private _address: string
  constructor(
    admin_id: number,
    password: string,
    username: string,
    phone: string,
    avatar: string,
    address: string,
    shop_name: string,
    email: string
  ) {
    this._admin_id = admin_id
    this._password = password
    this._username = username
    this._phone = phone
    this._avatar = avatar
    this._address = address
    this._shop_name = shop_name
    this._email = email
  }
  private _shop_name: string
  private _email: string

  public get_admin_id(): number {
    return this._admin_id
  }

  public set_admin_id(_admin_id: number): void {
    this._admin_id = _admin_id
  }

  public get_password(): string {
    return this._password
  }

  public set_password(_password: string): void {
    this._password = _password
  }

  public get_username(): string {
    return this._username
  }

  public set_username(_username: string): void {
    this._username = _username
  }

  public get_phone(): string {
    return this._phone
  }

  public set_phone(_phone: string): void {
    this._phone = _phone
  }

  public get_avatar(): string {
    return this._avatar!
  }

  public set_avatar(avatar?: string): void {
    this._avatar = avatar
  }

  public get_address(): string {
    return this._address
  }

  public set_address(_address: string): void {
    this._address = _address
  }

  public get_shop_name(): string {
    return this._shop_name
  }

  public set_shop_name(_shop_name: string): void {
    this._shop_name = _shop_name
  }

  public get_email(): string {
    return this._email
  }

  public set_email(_email: string): void {
    this._email = _email
  }
  public toString(): string {
    return `admin:${this._username}`
  }
}
