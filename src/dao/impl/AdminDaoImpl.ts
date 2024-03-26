/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 09:32:50
 * @LastEditTime: 2024-03-26 12:00:33
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\impl\AdminDaoImpl.ts
 * @Description: 管理员dao实现类
 */
import AdminDao from '../AdminDao'
import DBUtil from '../../utils/DBUtil'
import Admin from '../../model/Admin'
import AESHelper from '../../utils/AESHelper'

class AdminDaoImpl implements AdminDao {
  pool = DBUtil.createPoolConnection()
  sql: string = ''
  sqlParams: Array<any> = []
  /**
   * Description 根据管理员用户名找到对应管理员(已测试成功)
   * @param {any} username:string 管理员用户名
   * @returns {any} Admin类的promise
   */
  findByUsername(username: string): Promise<Admin> {
    // 使用sql预处理防止注入攻击和提高查询性能
    this.sql = 'select * from `admin` where `username` = ?'
    this.sqlParams = [username]
    return new Promise((resolve, reject) => {
      this.pool.execute(
        this.sql,
        this.sqlParams,
        (err: any, result: Array<any>) => {
          if (err) reject(err)
          if (result.length !== 0) {
            const admin: Admin = new Admin(
              result[0].password,
              result[0].username,
              result[0].phone,
              result[0].avatar,
              result[0].address,
              result[0].shop_name,
              result[0].email,
              result[0].admin_id
            )
            console.log('findByUsername:成功')
            console.log('查到的admin', admin)
            resolve(admin)
          } else {
            reject(null)
          }
        }
      )
    })
  }

  /**
   * Description 按用户名更新用户信息表数据(已测试成功)
   * @param {any} admin:Admin 管理员更新后的信息
   * @returns {Boolean} Boolean的promise
   */
  updateInfoByUsername(admin: Admin): Promise<boolean> {
    this.sql =
      'update `admin` set `shop_name`=?,`phone`=?,`address`=?,`email`=? where `username`=?'
    this.sqlParams = [
      admin.get_shop_name(),
      admin.get_phone(),
      admin.get_address(),
      admin.get_email(),
      admin.get_username()
    ]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err: any) => {
        if (err) reject(false)
        else {
          console.log('updateInfoByUsername:成功')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 根据用户名来更新密码(已测试成功)
   * @param {any} username:string 用户名
   * @param {any} password:string 更新后的用户密码
   * @returns {any} boolean的promise
   */
  updatePassByUsername(username: string, password: string): Promise<boolean> {
    this.sql = 'update `admin` set `password` = ? where `username` = ?'
    let encryptedPassword = AESHelper.encrypt(password) //把密码加密后存储提高安全性
    this.sqlParams = [encryptedPassword, username]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err: any) => {
        if (err) reject(false)
        else {
          console.log('updatePassByUsername:成功')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 根据用户名修改用户头像(已测试成功)
   * @param {any} username:string 用户名
   * @param {any} uploadPath:string 用户图片链接
   * @returns {any} Boolean的promise
   */
  updateAvatarByUsername(
    username: string,
    uploadPath: string
  ): Promise<boolean> {
    this.sql = 'update `admin` set `avatar` = ? where `username` = ?'
    this.sqlParams = [uploadPath, username]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err: any) => {
        if (err) reject(false)
        else {
          console.log('updateAvatarByUsername:成功')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 找到第一个管理员（已测试成功）
   * @returns {any} admin的promise
   */
  findFirstOnce(): Promise<Admin> {
    this.sql = 'select * from `admin` limit 1 offset 0'
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, (err: any, results: Admin[]) => {
        if (err) {
          console.error('Error executing query:', err)
          reject(err)
        } else {
          console.log('findFirstOnce:成功', results[0])
          resolve(results[0] as Admin)
        }
      })
    })
  }
}
export default AdminDaoImpl
