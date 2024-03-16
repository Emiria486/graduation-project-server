/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:14:39
 * @LastEditTime: 2024-03-16 22:21:58
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\User.ts
 * @Description: 用户实体类
 */
export default class User {
  private _user_id: number
  private _username: string
  private _password: string
  private _address: string
  private _avatar: string
  private wallet: number
  private _payment_password: string
  private _email: string

  public get_user_id(): number {
    return this._user_id
  }

  public set_user_id(_user_id: number): void {
    this._user_id = _user_id
  }

  public get_username(): string {
    return this._username
  }

  public set_username(_username: string): void {
    this._username = _username
  }

  public get_password(): string {
    return this._password
  }

  public set_password(_password: string): void {
    this._password = _password
  }

  public get_address(): string {
    return this._address
  }

  public set_address(_address: string): void {
    this._address = _address
  }

  public get_avatar(): string {
    return this._avatar
  }

  public set_avatar(_avatar: string): void {
    this._avatar = _avatar
  }

  public getWallet(): number {
    return this.wallet
  }

  public setWallet(wallet: number): void {
    this.wallet = wallet
  }

  public get_payment_password(): string {
    return this._payment_password
  }

  public set_payment_password(_payment_password: string): void {
    this._payment_password = _payment_password
  }

  public get_email(): string {
    return this._email
  }

  public set_email(_email: string): void {
    this._email = _email
  }

  constructor(
    user_id: number,
    username: string,
    password: string,
    address: string,
    avatar: string,
    wallet: number,
    payment_password: string,
    email: string
  ) {
    this._user_id = user_id
    this._username = username
    this._password = password
    this._address = address
    this._avatar = avatar
    this.wallet = wallet
    this._payment_password = payment_password
    this._email = email
  }
}
