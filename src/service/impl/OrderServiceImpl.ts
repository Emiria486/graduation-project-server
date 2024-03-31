/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 16:37:10
 * @LastEditTime: 2024-03-31 12:14:03
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\impl\OrderServiceImpl.ts
 * @Description: 订单service的实现类
 */
import OrderService from '../OrderService'
import Order from '../../model/Order'
import OrderDao from '../../dao/OrderDao'
import OrderDaoImpl from '../../dao/impl/OrderDaoImpl'
import OrderFood from '../../model/OrderFood'
import OrderType from '../../model/OrderType'
import OrderTypeEnum from '../../enum/OrderTypeEnum'
import OrderStatusEnum from '../../enum/OrderStatusEnum'
export default class OrderServiceImpl implements OrderService {
  private orderDao: OrderDao
  constructor() {
    this.orderDao = new OrderDaoImpl()
  }
  async getAllOrderCountNumber(user_id: number): Promise<number | boolean> {
    try {
      const allOrderNumber = await this.orderDao.getAllOrderCount(user_id)
      return allOrderNumber
    } catch (error) {
      console.log(error)
      return false
    }
  }
  /**
   * Description 向order表和orderFood表先后插入订单数据
   * @param {any} order:Order 订单信息
   * @param {any} user_id:number 用户id
   * @param {any} orderFoods:OrderFood[] 用户下单菜品信息
   * @returns {any}
   */
  async addOrder(
    order: Order,
    user_id: number,
    orderFoods: OrderFood[]
  ): Promise<boolean> {
    // 1.先向Order表插入数据后得到插入的order_id
    try {
      // 向order表插入一条记录
      const addOrderResult = await this.orderDao.insertOnce(order)
      // 插入成功后找到插入的记录信息
      if (addOrderResult) {
        let orderIDObject =
          await this.orderDao.queryOrderIdByUserIdAndCreate_time(
            user_id,
            order.create_time
          )
          // 获得订单编号
        let orderID = orderIDObject.order_id
        // 2.再向order_food表插入order_id,food_id，number
        let FullOrderFoods: OrderFood[] = []
        orderFoods.forEach((orderFood) => {
          const itemFood = new OrderFood(
            orderFood.food_id2,
            orderFood.number,
            orderID
          )
          FullOrderFoods.push(itemFood)
        })
        console.log("插入的orderFoods",FullOrderFoods)
        return await this.orderDao.insertOrderFood(FullOrderFoods)
      } else {
        return false // 处理无法成功插入订单的情况
      }
    } catch (error) {
      console.log(error)
      return false // 处理异常情况
    }
  }

  /**
   * Description 找到所有的订单种类（堂食，外卖，打包）
   * @returns {any} orderType[]
   */
  async getOrderType(): Promise<OrderType[]> {
    return await this.orderDao.queryAllOrderType()
  }
  /**
   * Description 获取指定用户的所有订单
   * @param {any} user_id:number
   * @returns {any}
   */
  async getUserOrders(user_id: number): Promise<Order[]> {
    return await this.orderDao.queryOrderByUserId(user_id)
  }
  /**
   * Description 找到指定订单id对应的下单菜品数量，订单号和下单菜品的全部信息的对象数组
   * @param {any} order_id:number
   * @returns {any} 下单菜品数量，订单号和下单菜品的全部信息的对象数组
   */
  async getUserOrderFoods(order_ids: number[]): Promise<any[] | null> {
    try {
      //包含下单菜品数量，订单号和下单菜品的全部信息的对象数组
      let promiseArray: any[] = order_ids.map((orderId) =>
        this.orderDao.findOrderFoodByOrderId(orderId)
      )
      let foods: any[] = await Promise.all(promiseArray)
      // 过滤空数组
      foods = foods.filter((item) =>
        Array.isArray(item) ? item.length > 0 : true
      )
      foods = foods.reduce((acc, val) => acc.concat(val), [])
      console.log('service的foods', foods)
      //处理格式
      foods = foods.map((item, index) => ({
        order_id: item.order_id,
        food: {
          number: item.number,
          food_id: item.food_id,
          food_name: item.food_name,
          price: item.price,
          image: item.image,
          status: item.status,
          description: item.description,
        },
      }))
      console.log('service的foods finally', foods)
      return foods
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * Description 找到指定用户最新时间的一个订单
   * @param {any} user_Id:number
   * @returns {any}
   */
  async getUserNewOrder(user_Id: number): Promise<Order> {
    return await this.orderDao.findNewOrderByUserId(user_Id)
  }
  /**
   * Description 根据指定订单号找到orderFood
   * @param {any} order_Id:number
   * @returns {any} 包含下单菜品数量，订单号和下单菜品的全部信息的对象数组
   */
  async getUserNewOrderFoods(order_Id: number): Promise<any[]> {
    return await this.orderDao.findOrderFoodByOrderId(order_Id)
  }
  /**
   * Description 查找所有未处理的订单：status为0
   * @returns {any}
   */
  async getOutstandingOrder(): Promise<Order[]> {
    return await this.orderDao.queryOutstandingOrder()
  }
  async getOrdersByPaginationAndDate(
    pageStart: number,
    pageSize: number,
    startTime: string,
    endTime: string
  ): Promise<Order[]> {
    pageStart = (pageStart - 1) * pageSize
    return await this.orderDao.queryByPageAndDate(
      pageStart,
      pageSize,
      startTime,
      endTime
    )
  }
  /**
   * Description 统计指定时间段的订单总数
   * @param {any} startTime:string 开始时间
   * @param {any} endTime:string    截至时间
   * @returns {any}
   */
  async getOrdersCount(
    startTime: string,
    endTime: string
  ): Promise<number | boolean> {
    return await this.orderDao
      .queryCountByDate(startTime, endTime)
      .catch(() => false)
  }
}
