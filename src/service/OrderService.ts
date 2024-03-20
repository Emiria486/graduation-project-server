/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 16:21:31
 * @LastEditTime: 2024-03-20 16:36:17
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\OrderService.ts
 * @Description: 订单service的接口定义
 */
import OrderFood from '../model/OrderFood'
import Order from '../model/Order'
import OrderType from '../model/OrderType'
export default interface OrderService {
  addOrder(
    order: Order,
    user_id: number,
    orderFoods: OrderFood[]
  ): Promise<boolean>
  getOrderType(): Promise<OrderType[]>
  getUserOrders(user_id: number): Promise<Order[]>
  getUserOrderFoods(order_id: number): Promise<any[] | null>
  getUserNewOrder(user_Id: number): Promise<Order>
  getUserNewOrderFoods(order_Id: number): Promise<any[]>
  getOutstandingOrder(): Promise<Order[]>
  getOrdersByPaginationAndDate(
    pageStart: number,
    pageSize: number,
    startTime: string,
    endTime: string
  ): Promise<Order[]>
  getOrdersCount(startTime: string, endTime: string): Promise<number | boolean>
}
