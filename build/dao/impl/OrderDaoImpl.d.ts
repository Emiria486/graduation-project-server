import OrderDao from '../OrderDao';
import Order from '../../model/Order';
import OrderFood from '../../model/OrderFood';
import OrderType from '../../model/OrderType';
export default class OrderDaoImpl implements OrderDao {
    pool: import("mysql2/typings/mysql/lib/Pool").Pool;
    sql: string;
    sqlParams: Array<any>;
    /**
     * Description 根据userId和订单创建时间获取订单信息(已测试成功)
     * @param {any} user_id:number 用户id
     * @param {any} create_time:string 订单创建时间
     * @returns {any} order
     */
    queryOrderIdByUserIdAndCreate_time(user_id: number, create_time: string): Promise<Order>;
    getAllOrderCount(user_id: number): Promise<number>;
    /**
     * Description 插入一条新订单(已测试成功)
     * @param {any} order:Order 订单信息类
     * @returns {any} Boolean的promise
     */
    insertOnce(order: Order): Promise<boolean>;
    /**
     * Description 查询所有的订单就餐种类:orderType (已测试成功)
     * @returns {any} 返回orderType[]的promise
     */
    queryAllOrderType(): Promise<OrderType[]>;
    /**
     * Description 查询指定用户id的订单(已测试成功)
     * @param {any} UserId:number 指定用户id
     * @returns {any} order[]的promise
     */
    queryOrderByUserId(UserId: number): Promise<Order[]>;
    /**
     * Description 查找指定用户的当前最新的一个订单(已测试成功)
     * @param {any} UserId:number 指定用户id
     * @returns {any} order的promise
     */
    findNewOrderByUserId(UserId: number): Promise<Order>;
    /**
     * Description 查找未处理的订单：status为0  (已测试成功)
     * @returns {any} order[]的promise
     */
    queryOutstandingOrder(): Promise<Order[]>;
    /**
     * Description 根据时间进行分页查询(已测试成功)
     * @param {any} pageStart:number 起始页
     * @param {any} pageSize:number 一页的大小
     * @param {any} startTime:string  开始范围时间
     * @param {any} endTime:string    结束范围时间
     * @returns {any} order[]的promise
     */
    queryByPageAndDate(pageStart: number, pageSize: number, startTime: string, endTime: string): Promise<Order[]>;
    /**
     * Description 按日期统计期间订单数量(已测试成功)
     * @param {any} startTime:string 起始时间(yyyy-mm-dd格式)
     * @param {any} endTime:string    结束时间（yyyy-mm-dd格式）
     * @returns {any} 订单总数
     */
    queryCountByDate(startTime: string, endTime: string): Promise<number>;
    /**
     * Description 插入一条或多条order_food (已测试成功)
     * @param {any} foods:OrderFood[] orderFood[]
     * @returns {any} boolean的promise
     */
    insertOrderFood(foods: OrderFood[]): Promise<boolean>;
    /**
     * Description 根据指定的订单id找到下单菜品数量，订单号和下单菜品的全部信息(已测试成功)
     * @param {any} orderId:number 订单id
     * @returns {any} 包含下单菜品数量，订单号和下单菜品的全部信息的对象数组的promise
     */
    findOrderFoodByOrderId(orderId: number): Promise<any[]>;
}
