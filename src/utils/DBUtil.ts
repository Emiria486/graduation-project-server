/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 14:42:49
 * @LastEditTime: 2024-04-06 17:49:41
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\DBUtil.ts
 * @Description: 建立mysql连接池函数
 */
import mysql, { PoolOptions } from 'mysql2'
import { errorHandler } from '../exceptions/ErrorHandler'
class DBUtil {
  public static access: PoolOptions = {
    host: '127.0.0.1', //id地址
    user: 'root', //连接用户
    password: '123581lyj', //登录密码
    database: 'order_food', // 使用的database名称
    charset: 'utf8mb4', //字符集
    waitForConnections: true,
    connectionLimit: 100,
    maxIdle: 100, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  }
  /**
   * Description 创建mysql2连接池，使用后不可以end()关闭，官方文档不推荐
   * @returns {any} 返回连接池对象
   */
  public static createPoolConnection() {
    const pool = mysql.createPool(this.access)
    // 添加处理事务逻辑
    pool.on('connection', (connection) => {
      // 设置为手动提交模式,保证数据的一致性和完整性
      connection.query('SET SESSION autocommit=0;', (err) => {
        if (err) {
          errorHandler.handleError(err)
        }
      })
    })
    return pool
  }
}
export default DBUtil
