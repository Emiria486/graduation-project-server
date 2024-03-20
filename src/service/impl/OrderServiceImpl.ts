/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 16:37:10
 * @LastEditTime: 2024-03-20 18:39:04
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
      const addOrderResult = await this.orderDao.insertOnce(order)
      if (addOrderResult) {
        let orderIDObject =
          await this.orderDao.queryOrderIdByUserIdAndCreate_time(
            user_id,
            order.get_create_time()
          )
        let orderID = orderIDObject.get_order_id()
        // 2.再向order_food表插入order_id,food_id，number
        let FullOrderFoods: OrderFood[] = []
        orderFoods.forEach((orderFood) => {
          const itemFood = new OrderFood(
            orderFood.get_food_id2(),
            orderFood.get_number(),
            orderID
          )
          FullOrderFoods.push(itemFood)
        })
        return await this.orderDao
          .insertOrderFood(FullOrderFoods)
          .catch(() => false)
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
  async getUserOrderFoods(order_id: number): Promise<any[] | null> {
    try {
      //包含下单菜品数量，订单号和下单菜品的全部信息的对象数组
      let PromiseArray = await this.orderDao.findOrderFoodByOrderId(order_id)
      return PromiseArray
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * Description 找到指定用户最近的一个订单
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
