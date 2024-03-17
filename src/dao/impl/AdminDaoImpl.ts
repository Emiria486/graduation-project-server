/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 09:32:50
 * @LastEditTime: 2024-03-17 12:57:44
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\impl\AdminDaoImpl.ts
 * @Description: 管理员dao实现类
 */
import AdminDao from '../AdminDao'
import DBUtil from '../../utils/DBUtil'
import Admin from '../../model/Admin'

class AdminDaoImpl implements AdminDao {
  connection = DBUtil.createConnection()
  sql: string = ''
  sqlParams: Array<any> = []
  findByUsername(username: string): Promise<Admin> {
    this.connection = DBUtil.createConnection()

    this.sql = 'select * from admin where username = ?'
    this.sqlParams = [username]
    return new Promise((resolve, reject) => {
      this.connection.query(
        this.sql,
        this.sqlParams,
        (err: any, result: Array<any>) => {
          if (err) reject(err)
          if (result.length !== 0) {
            const admin: Admin = new Admin(
              result[0].admin_id,
              result[0].password,
              result[0].username,
              result[0].phone,
              result[0].avatar,
              result[0].address,
              result[0].shop_name,
              result[0].email
            )
            resolve(admin)
          } else {
            reject(null)
          }
          this.connection.end()
        }
      )
    })
  }

  /**
   * Description 按用户名更新用户信息表数据
   * @param {any} admin:Admin admin
   * @returns {Boolean}
   */
  updateInfoByUsername(admin: Admin): Promise<boolean> {
    this.connection = DBUtil.createConnection()

    this.sql =
      'update admin set shop_name=?,phone=?,address=?,email=? where username=?'
    this.sqlParams = [
      admin.get_shop_name(),
      admin.get_phone(),
      admin.get_address(),
      admin.get_email(),
      admin.get_username(),
    ]
    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, this.sqlParams, (err: any) => {
        if (err) reject(false)
        else resolve(true)
      })
      this.connection.end()
    })
  }
  updatePassByUsername(username: string, password: string): Promise<boolean> {
    this.connection = DBUtil.createConnection()

    this.sql = 'update admin set password = ? where username = ?'
    this.sqlParams = [password, username]
    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, this.sqlParams, (err: any) => {
        if (err) reject(false)
        else resolve(true)
      })
      this.connection.end()
    })
  }
  updateAvatarByUsername(
    username: string,
    uploadPath: string
  ): Promise<boolean> {
    this.connection = DBUtil.createConnection()

    this.sql = 'update admin set avatar = ? where username = ?'
    this.sqlParams = [uploadPath, username]
    return new Promise((resolve, reject) => {
      this.connection.query(this.sql, this.sqlParams, (err: any) => {
        if (err) reject(false)
        else resolve(true)
      })
      this.connection.end()
    })
  }
  findFirstOnce(): Promise<Admin> {
    this.sql = 'select * from admin limit 1 offset 0'
    return new Promise((resolve, rejects) => {
      this.connection.query(this.sql, (err: any, results: Admin[]) => {
        if (err) {
          console.error('Error executing query:', err)
          return
        } else {
          console.log('执行成功', results[0])
          resolve(results[0])
        }
      })
    })
  }
}
export default AdminDaoImpl
