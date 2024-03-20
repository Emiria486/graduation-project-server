/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 18:40:25
 * @LastEditTime: 2024-03-20 20:59:17
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\UserService.ts
 * @Description: 头部注释配置模板
 */
import LoginEnum from '../enum/LoginEnum'
import User from '../model/User'
import RegisterEnum from '../enum/RegisterEnum'

export default interface UserService {
  login(username: string, password: string): Promise<LoginEnum | string>
  register(
    username: string,
    password: string,
    email: string,
    phone: string
  ): Promise<RegisterEnum>
  updateUserInfo(
    userId: number,
    username: string,
    phone: string,
    address: string,
    email: string
  ): Promise<boolean>
  getUserInfo(userId: number): Promise<User | null>
  getPaymentPass(userId: number): Promise<string | boolean>
  updatePaymentPass(userId: number, payment_password: string): Promise<boolean>
  validatePaymentPass(
    userId: number,
    payment_password: string
  ): Promise<boolean>
  updateUserWallet(userId: number, price: number): Promise<boolean>
  findUserWallet(userId: number): Promise<number | boolean>
}
