/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 22:00:43
 * @LastEditTime: 2024-03-18 21:04:53
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\impl\OrderDaoImpl.ts
 * @Description: 订单（order）实体类的dao实现类和order_food实体类的dao实体类
 */
import OrderDao from '../OrderDao'
import Order from '../../model/Order'
import OrderFood from '../../model/OrderFood'
import OrderType from '../../model/OrderType'
import DBUtil from '../../utils/DBUtil'
export default class OrderDaoImpl implements OrderDao {
  pool = DBUtil.createPoolConnection()
  sql: string = ''
  sqlParams: Array<any> = []
  insertOnce(order: Order): Promise<boolean> {
    this.sql =
      'insert into `order`(`user_id`,`user_phone`,`status`,`create_time`,`order_type`,`price`,`discount`,`address`) values(?,?,?,?,?,?,?,?)'
    this.sqlParams = [
      order.get_user_id(),
      order.get_user_phone(),
      order.get_status(),
      order.get_create_time(),
      order.get_order_type(),
      order.get_price(),
      order.get_discount(),
      order.get_address(),
    ]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else resolve(true)
      })
    })
  }

  queryAllOrderType(): Promise<OrderType[]> {
    this.sql = 'select * from `order_type`'
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, (err: any, result: OrderType[]) => {
        if (err) reject(err)
        else {
          console.log('订单种类 orderType:', result)
          resolve(result)
        }
      })
    })
  }
  queryOrderByUserId(UserId: number): Promise<Order[]> {
    this.sql = 'select * from `order` where `user_id`=?'
    this.sqlParams = [UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result) => {
        if (err) reject(err)
        else {
          console.log('userID_Order', result)
          resolve(result as Order[])
        }
      })
    })
  }
  /**
   * Description 查找用户当前最新订单
   * @param {any} UserId:number
   * @returns {any}
   */
  findNewOrderByUserId(UserId: number): Promise<Order> {
    this.sql =
      'select * from `order` where `user_id`=? order by timestamp(`create_time`) desc'
    this.sqlParams = [UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('newest order', result[0])
          resolve(result[0] as Order)
        }
      })
    })
  }
  /**
   * Description 查找未处理的订单(status为0)
   * @returns {any}
   */
  queryOutstandingOrder(): Promise<Order[]> {
    this.sql = 'select * from `order` where `status`=0'
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, (err: any, results: Order[]) => {
        if (err) reject(err)
        else resolve(results)
      })
    })
  }
  queryByPageAndDate(
    pageStart: number,
    pageSize: number,
    startTime: string,
    endTime: string
  ): Promise<Order[]> {
    this.sql =
      'select * from `order` where `create_time` between ? and ? limit ? offset ?'
    this.sqlParams = [startTime, endTime, pageSize, pageStart]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result) => {
        if (err) reject(err)
        else {
          console.log('分页', result)
          resolve(result as Order[])
        }
      })
    })
  }
  /**
   * Description 按日期统计期间订单数量
   * @param {any} startTime:string 起始时间(yyyy-mm-dd格式)
   * @param {any} endTime:string    结束时间（yyyy-mm-dd格式）
   * @returns {any} 订单总数
   */
  queryCountByDate(startTime: string, endTime: string): Promise<number> {
    this.sql =
      'select count(*) as counts from `order` where Date(`create_time`) between Date(?) and Date(?)'
    this.sqlParams = [startTime, endTime]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('期间订单数量：', result[0].counts)
          resolve(result[0].counts)
        }
      })
    })
  }
  insertOrderFood(foods: OrderFood[]): Promise<boolean> {
    // sql语句的拼接
    let stringTemplate: string = '(?,?,?),'
    let paramString: string = ''
    // 确定插入values的数量，
    for (let i = 0; i < foods.length; i++) {
      paramString += stringTemplate
    }
    // 去掉最后的逗号
    paramString = paramString.slice(0, paramString.length - 1)
    this.sql =
      'insert into `order_food`(`order_id`,`food_id2`,`number`) values ' +
      paramString
    this.sqlParams = []
    // sqlparam的拼接
    foods.forEach((item) => {
      this.sqlParams.push(item.get_order_id())
      this.sqlParams.push(item.get_food_id2())
      this.sqlParams.push(item.get_number())
    })
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else {
          console.log('插入订单菜品数量成功')
          resolve(true)
        }
      })
    })
  }
  findOrderFoodByOrderId(orderId: number): Promise<any[]> {
    this.sql = this.sql =
      'select o_f.`number`, o_f.`order_id`, f.* from `order_food` o_f inner join `food` f on o_f.`food_id2` = f.`food_id` where `order_id` = ?'
    this.sqlParams = [orderId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('findOrderFoodByOrderId结果', result)
          resolve(result)
        }
      })
    })
  }
}
