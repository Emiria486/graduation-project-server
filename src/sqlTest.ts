import mysql from 'mysql2'
import Admin from './model/Admin'
import DBUtil from './utils/DBUtil'

// 创建数据库连接
const connection = DBUtil.createConnection()

// 连接到数据库

// 执行 SQL 查询,可以用??代替表名、字段、索引名；用?代替数据。
const sql = 'SELECT * FROM admin WHERE admin_id=1'
connection.query(sql, (err: any, results: Admin[]) => {
  if (err) {
    console.error('Error executing query:', err)
    return
  }
  console.log('Query results:', results)
})

// 在数据库连接关闭时触发
connection.on('end', () => {
  console.log('Database connection closed')
})

// 在发生错误时触发
connection.on('error', (err: any) => {
  console.error('Database error:', err)
})

// 关闭数据库连接
// connection.end()
