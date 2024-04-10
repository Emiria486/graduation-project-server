import OrderService from '../OrderService';
import Order from '../../model/Order';
import OrderFood from '../../model/OrderFood';
import OrderType from '../../model/OrderType';
export default class OrderServiceImpl implements OrderService {
    private orderDao;
    constructor();
    getAllOrderCountNumber(user_id: number): Promise<number | boolean>;
    /**
     * Description 向order表和orderFood表先后插入订单数据
     * @param {any} order:Order 订单信息
     * @param {any} user_id:number 用户id
     * @param {any} orderFoods:OrderFood[] 用户下单菜品信息
     * @returns {any}
     */
    addOrder(order: Order, user_id: number, orderFoods: OrderFood[]): Promise<boolean>;
    /**
     * Description 找到所有的订单种类（堂食，外卖，打包）
     * @returns {any} orderType[]
     */
    getOrderType(): Promise<OrderType[]>;
    /**
     * Description 获取指定用户的所有订单
     * @param {any} user_id:number
     * @returns {any}
     */
    getUserOrders(user_id: number): Promise<Order[]>;
    /**
     * Description 找到指定订单id对应的下单菜品数量，订单号和下单菜品的全部信息的对象数组
     * @param {any} order_id:number
     * @returns {any} 下单菜品数量，订单号和下单菜品的全部信息的对象数组
     */
    getUserOrderFoods(order_ids: number[]): Promise<any[] | null>;
    /**
     * Description 找到指定用户最新时间的一个订单
     * @param {any} user_Id:number
     * @returns {any}
     */
    getUserNewOrder(user_Id: number): Promise<Order>;
    /**
     * Description 根据指定订单号找到orderFood
     * @param {any} order_Id:number
     * @returns {any} 包含下单菜品数量，订单号和下单菜品的全部信息的对象数组
     */
    getUserNewOrderFoods(order_Id: number): Promise<any[]>;
    /**
     * Description 查找所有未处理的订单：status为0
     * @returns {any}
     */
    getOutstandingOrder(): Promise<Order[]>;
    getOrdersByPaginationAndDate(pageStart: number, pageSize: number, startTime: string, endTime: string): Promise<Order[]>;
    /**
     * Description 统计指定时间段的订单总数
     * @param {any} startTime:string 开始时间
     * @param {any} endTime:string    截至时间
     * @returns {any}
     */
    getOrdersCount(startTime: string, endTime: string): Promise<number | boolean>;
}
