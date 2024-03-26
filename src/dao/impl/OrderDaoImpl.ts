/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 22:00:43
 * @LastEditTime: 2024-03-26 12:25:08
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
  /**
   * Description 根据userId和订单创建时间获取订单信息(已测试成功)
   * @param {any} user_id:number 用户id
   * @param {any} create_time:string 订单创建时间
   * @returns {any} order
   */
  queryOrderIdByUserIdAndCreate_time(
    user_id: number,
    create_time: string
  ): Promise<Order> {
    this.sql = 'select * from `order` where `user_id`=? and `create_time`=?'
    this.sqlParams = [user_id, create_time]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('queryOrderIdByUserIdAndCreate_time:成功', result[0])
          return result[0] as Order
        }
      })
    })
  }
  /**
   * Description 插入一条新订单(已测试成功)
   * @param {any} order:Order 订单信息类
   * @returns {any} Boolean的promise
   */
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
        if (err) reject(err)
        else {
          console.log('insertOnce:成功')
          resolve(true)
        }
      })
    })
  }

  /**
   * Description 查询所有的订单就餐种类:orderType (已测试成功)
   * @returns {any} 返回orderType[]的promise
   */
  queryAllOrderType(): Promise<OrderType[]> {
    this.sql = 'select * from `order_type`'
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, (err: any, result: OrderType[]) => {
        if (err) reject(err)
        else {
          console.log('queryAllOrderType:成功', result)
          resolve(result)
        }
      })
    })
  }
  /**
   * Description 查询指定用户id的订单(已测试成功)
   * @param {any} UserId:number 指定用户id
   * @returns {any} order[]的promise
   */
  queryOrderByUserId(UserId: number): Promise<Order[]> {
    this.sql = 'select * from `order` where `user_id`=?'
    this.sqlParams = [UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result) => {
        if (err) reject(err)
        else {
          console.log('queryOrderByUserId:成功', result)
          resolve(result as Order[])
        }
      })
    })
  }
  /**
   * Description 查找指定用户的当前最新的一个订单(已测试成功)
   * @param {any} UserId:number 指定用户id
   * @returns {any} order的promise
   */
  findNewOrderByUserId(UserId: number): Promise<Order> {
    this.sql =
      'select * from `order` where `user_id`=? order by timestamp(`create_time`) desc'
    this.sqlParams = [UserId]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('findNewOrderByUserId:成功', result[0])
          resolve(result[0] as Order)
        }
      })
    })
  }
  /**
   * Description 查找未处理的订单：status为0  (已测试成功)
   * @returns {any} order[]的promise
   */
  queryOutstandingOrder(): Promise<Order[]> {
    this.sql = 'select * from `order` where `status`=0'
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, (err: any, results: Order[]) => {
        if (err) reject(err)
        else {
          console.log('queryOutstandingOrder:成功', results)
          resolve(results)
        }
      })
    })
  }
  /**
   * Description 根据时间进行分页查询(已测试成功)
   * @param {any} pageStart:number 起始页
   * @param {any} pageSize:number 一页的大小
   * @param {any} startTime:string  开始范围时间
   * @param {any} endTime:string    结束范围时间
   * @returns {any} order[]的promise
   */
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
          console.log('queryByPageAndDate:成功', result)
          resolve(result as Order[])
        }
      })
    })
  }
  /**
   * Description 按日期统计期间订单数量(已测试成功)
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
          console.log('queryCountByDate:成功', result[0].counts)
          resolve(result[0].counts)
        }
      })
    })
  }
  /**
   * Description 插入一条或多条order_food (已测试成功)
   * @param {any} foods:OrderFood[] orderFood[]
   * @returns {any} boolean的promise
   */
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
          console.log('insertOrderFood:成功')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 根据指定的订单id找到下单菜品数量，订单号和下单菜品的全部信息(已测试成功)
   * @param {any} orderId:number 订单id
   * @returns {any} 包含下单菜品数量，订单号和下单菜品的全部信息的对象数组的promise
   */
  findOrderFoodByOrderId(orderId: number): Promise<any[]> {
    this.sql = this.sql =
      'select o_f.`number`, o_f.`order_id`, f.* from `order_food` o_f inner join `food` f on o_f.`food_id2` = f.`food_id` where `order_id` = ?'
    this.sqlParams = [orderId]
    console.log("findOrderFoodByOrderId的参数OrderId",orderId)
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('findOrderFoodByOrderId:成功', result)
          resolve(result)
        }
      })
    })
  }
}
