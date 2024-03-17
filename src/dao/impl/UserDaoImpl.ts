/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 19:10:30
 * @LastEditTime: 2024-03-17 20:33:45
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\impl\UserDaoImpl.ts
 * @Description: 用户DAO接口实现类
 */
import UserDao from '../UserDao'
import User from '../../model/User'
import DBUtil from '../../utils/DBUtil'

export default class UserDaoImpl implements UserDao {
  pool = DBUtil.createPoolConnection()
  sql: string = ''
  sqlParams: Array<any> = []
  findByUserId(UserId: number): Promise<User> {
    this.sql = 'select * from `user` where `user_id` = ?'
    this.sqlParams = [UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else resolve(result[0] as User)
      })
    })
  }

  updateInfoByUserId(
    UserId: number,
    username: string,
    phone: string,
    address: string,
    email: string
  ): Promise<boolean> {
    this.sql =
      'update `user` set `username` = ?, `phone` = ?, `address` = ?,`email`=? where `user_id` = ?'
    this.sqlParams = [username, phone, address, email, UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else resolve(true)
      })
    })
  }
  insertOnce(
    username: string,
    password: string,
    email: string,
    phone: string
  ): Promise<boolean> {
    this.sql =
      'insert into `user`(`username`,`password`,`email`,`phone`)values(?,?,?,?)'
    this.sqlParams = [username, password, email, phone]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else resolve(true)
      })
    })
  }

  findPaymentPassByUserId(UserId: number): Promise<string> {
    this.sql = 'select `payment_password` from `user` where `user_id`=?'
    this.sqlParams = [UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('payment_password: ' + result[0].payment_password)
          resolve(result[0].payment_password)
        }
      })
    })
  }
  updatePaymentPass(
    UserId: number,
    payment_password: string
  ): Promise<boolean> {
    this.sql = 'update `user` set `payment_password=? where user_id=?`'
    this.sqlParams = [payment_password, UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(err)
        else resolve(true)
      })
    })
  }
  updateWalletById(UserId: number, price: number): Promise<boolean> {
    this.sql = 'update `user` set `wallet=`wallet+? where user_id=?'
    this.sqlParams = [price, UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else resolve(true)
      })
    })
  }
  findWalletById(UserId: number): Promise<number> {
    this.sql = 'select wallet from `user` where `user_id`'
    this.sqlParams = [UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('wallet' + result[0].wallet)
          resolve(result[0].wallet)
        }
      })
    })
  }
}
