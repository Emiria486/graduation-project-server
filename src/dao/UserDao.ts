/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 19:07:17
 * @LastEditTime: 2024-03-17 20:19:05
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\UserDao.ts
 * @Description: 用户的Dao定义接口
 */
import User from '../model/User'

export default interface UserDao {
  findByUserId(UserId: number): Promise<User>
  updateInfoByUserId(
    UserId: number,
    username: string,
    phone: string,
    address: string,
    email: string
  ): Promise<boolean>

  insertOnce(
    username: string,
    password: string,
    email: string,
    phone: string
  ): Promise<boolean>

  findPaymentPassByUserId(UserId: number): Promise<string>

  updatePaymentPass(UserId: number, payment_password: string): Promise<boolean>

  updateWalletById(UserId: number, price: number): Promise<boolean>

  findWalletById(UserId: number): Promise<number>

  findByUserName(UserName: string): Promise<User>
}
