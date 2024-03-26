/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 21:44:49
 * @LastEditTime: 2024-03-25 23:55:15
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Admin.ts
 * @Description: 管理员实体类
 */
export default class Admin {
   admin_id: number = 0 //mysql 数据库里面设置了id自增，所以为了避免在构造函数里面手动添加id值，直接使用默认赋值
   password: string
   username: string
   phone: string
   avatar?: string
   address: string
   shop_name: string
   email: string
  constructor(
    password: string,
    username: string,
    phone: string,
    avatar: string,
    address: string,
    shop_name: string,
    email: string,
    admin_id?: number
  ) {
    if (admin_id) {
      this.admin_id = admin_id
      this.password = password
      this.username = username
      this.phone = phone
      this.avatar = avatar
      this.address = address
      this.shop_name = shop_name
      this.email = email
    } else {
      this.password = password
      this.username = username
      this.phone = phone
      this.avatar = avatar
      this.address = address
      this.shop_name = shop_name
      this.email = email
    }
  }

  public get_admin_id(): number {
    return this.admin_id
  }

  public set_admin_id(_admin_id: number): void {
    this.admin_id = _admin_id
  }

  public get_password(): string {
    return this.password
  }

  public set_password(_password: string): void {
    this.password = _password
  }

  public get_username(): string {
    return this.username
  }

  public set_username(_username: string): void {
    this.username = _username
  }

  public get_phone(): string {
    return this.phone
  }

  public set_phone(_phone: string): void {
    this.phone = _phone
  }

  public get_avatar(): string {
    return this.avatar!
  }

  public set_avatar(avatar?: string): void {
    this.avatar = avatar
  }

  public get_address(): string {
    return this.address
  }

  public set_address(_address: string): void {
    this.address = _address
  }

  public get_shop_name(): string {
    return this.shop_name
  }

  public set_shop_name(_shop_name: string): void {
    this.shop_name = _shop_name
  }

  public get_email(): string {
    return this.email
  }

  public set_email(_email: string): void {
    this.email = _email
  }
}
