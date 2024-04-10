import Order from '../model/Order';
import OrderFood from '../model/OrderFood';
import OrderType from '../model/OrderType';
export default interface OrderDao {
    insertOnce(order: Order): Promise<boolean>;
    queryAllOrderType(): Promise<OrderType[]>;
    queryOrderByUserId(UserId: number): Promise<Order[]>;
    findNewOrderByUserId(UserId: number): Promise<Order>;
    queryOutstandingOrder(): Promise<Order[]>;
    queryByPageAndDate(pageStart: number, pageSize: number, startTime: string, endTime: string): Promise<Order[]>;
    queryCountByDate(startTime: string, endTime: string): Promise<number>;
    queryOrderIdByUserIdAndCreate_time(user_id: number, create_time: string): Promise<Order>;
    insertOrderFood(foods: OrderFood[]): Promise<boolean>;
    findOrderFoodByOrderId(orderId: number): Promise<any[]>;
    /**
    * Description 获取指定指定id用户的订单总数
    * @param {any} user_id:number
    * @returns {any}
    */
    getAllOrderCount(user_id: number): Promise<number>;
}
