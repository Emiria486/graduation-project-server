/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:14:39
 * @LastEditTime: 2024-03-29 09:24:56
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\User.ts
 * @Description: 用户实体类
 */
export default class User {
  user_id?: number //mysql 数据库里面设置了id自增，所以为了避免在构造函数里面手动添加id值，直接使用默认赋值
  username: string=''
  password: string=''
  address: string=''
  avatar: string=''
  wallet: number=0
  payment_password: string=''
  email: string=''
  phone: string=''
  constructor(
    username: string ,
    password: string ,
    address: string ,
    avatar: string ,
    wallet: number,
    payment_password: string ,
    email: string ,
    phone: string ,
    user_id?: number
  ) {
    if (user_id) {
      this.user_id = user_id
      this.username = username
      this.password = password
      this.address = address
      this.avatar = avatar
      this.wallet = wallet
      this.payment_password = payment_password
      this.email = email
      this.phone = phone
    } else {
      this.username = username
      this.password = password
      this.address = address
      this.avatar = avatar
      this.wallet = wallet
      this.payment_password = payment_password
      this.email = email
      this.phone = phone
    }
  }

  public get_user_id(): number | undefined {
    return this.user_id
  }

  public set_user_id(_user_id: number): void {
    this.user_id = _user_id
  }

  public get_username(): string {
    return this.username
  }

  public set_username(_username: string): void {
    this.username = _username
  }

  public get_password(): string {
    return this.password
  }

  public set_password(_password: string): void {
    this.password = _password
  }

  public get_address(): string {
    return this.address
  }

  public set_address(_address: string): void {
    this.address = _address
  }

  public get_avatar(): string {
    return this.avatar
  }

  public set_avatar(_avatar: string): void {
    this.avatar = _avatar
  }

  public getWallet(): number {
    return this.wallet
  }

  public setWallet(wallet: number): void {
    this.wallet = wallet
  }

  public get_payment_password(): string {
    return this.payment_password
  }

  public set_payment_password(_payment_password: string): void {
    this.payment_password = _payment_password
  }

  public get_email(): string {
    return this.email
  }

  public set_email(_email: string): void {
    this.email = _email
  }

  public get_phone(): string {
    return this.phone
  }

  public set_phone(_phone: string): void {
    this.phone = _phone
  }
}
