import Coupon from '../../model/Coupon';
import CouponDao from '../CouponDao';
export default class CouponDaoImpl implements CouponDao {
    pool: import("mysql2/typings/mysql/lib/Pool").Pool;
    sql: string;
    sqlParams: Array<any>;
    /**
     * Description 添加一条优惠劵信息(已测试成功)
     * @param {any} coupon:Coupon 用户卷类
     * @returns {any} boolean的promise
     */
    addCoupon(coupon: Coupon): Promise<boolean>;
    /**
     * Description 给指定id的用户添加指定优惠劵(已测试成功)
     * @param {any} coupon_id:number 优惠劵id
     * @param {any} user_id:number  用户id
     * @returns {any} Boolean的promise
     */
    addCouponToUser(coupon_id: number, user_id: number): Promise<boolean>;
    /**
     * Description 找到有效期大于指定天数的优惠劵(已测试成功)
     * @param {any} date:number 指定天数
     * @returns {any} coupon[]的promise
     */
    findByDate(date: number): Promise<Coupon[]>;
    /**
     * Description 找到指定用户的所有可用优惠劵(已测试成功)
     * @param {any} user_id:number 用户id
     * @returns {any} coupon[]
     */
    findUserCoupons(user_id: number): Promise<Coupon[]>;
    /**
     * Description 查询指定用户的所有可用优惠劵数量（已测试成功）
     * @param {any} user_id:number 用户id
     * @returns {any} number的promise
     */
    findAvailableCountByUserId(user_id: number): Promise<number>;
    /**
     * Description 更新指定用户的优惠劵可用状态(已测试成功)
     * @param {any} status=0 优惠劵状态默认为0，调整为不可用
     * @param {any} user_id:number 用户id
     * @param {any} coupon_id:number 优惠劵id
     * @returns {any} Boolean的promise
     */
    updateStatusById(status: any, user_id: number, coupon_id: number): Promise<boolean>;
}
