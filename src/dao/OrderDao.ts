/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 21:46:22
 * @LastEditTime: 2024-03-17 21:59:52
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\OrderDao.ts
 * @Description: 订单类Dao接口定义
 */
import Order from '../model/Order'
import OrderFood from '../model/OrderFood'
import OrderType from '../model/OrderType'

export default interface OrderDao {
    // order表
  insertOnce(order: Order): Promise<boolean>
  queryAllOrderType(): Promise<OrderType[]>
  queryOrderByUserId(UserId: number): Promise<Order[]>
  findNewOrderByUserId(UserId: number): Promise<Order>
  queryOutstandingOrder(): Promise<Order[]>
  queryByPageAndDate(
    pageStart: number,
    pageSize: number,
    startTime: string,
    endTime: string
  ): Promise<Order[]>
  queryCountByDate(startTime: string, endTime: string): Promise<number>
//   order_food表
  insertOrderFood(foods: OrderFood[]): Promise<boolean>
  findOrderFoodByOrderId(orderId: number): Promise<any[]>
}
