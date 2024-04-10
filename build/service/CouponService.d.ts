import Coupon from '../model/Coupon';
export default interface CouponService {
    /**
     * Description 向优惠劵库添加新的优惠劵信息
     * @param {any} title:string 优惠劵标题
     * @param {any} discount:number 减免金额
     * @param {any} limit:number  使用限制金额
     * @param {any} create_time:string 生成时间
     * @param {any} expireIn:number 过期时间
     * @returns {any} 是否添加成功的boolean
     */
    issueCoupon(title: string, discount: number, limit: number, create_time: string, expireIn: number): Promise<boolean>;
    /**
     * Description 找到距离过期大于指定日数的优惠劵
     * @param {any} date:number 指定日数
     * @returns {any} 优惠劵数组或空
     */
    getIssueCoupons(date: number): Promise<Coupon[] | null>;
    /**
     * Description 给指定用户添加指定优惠劵
     * @param {any} coupon_id:number 优惠劵id
     * @param {any} user_id:number 用户id
     * @returns {any} Boolean：是否添加成功
     */
    getCoupon(coupon_id: number, user_id: number): Promise<boolean>;
    /**
     * Description 找到指定用户的所有可用优惠劵
     * @param {any} user_id:number 用户id
     * @returns {any}优惠劵数组或空
     */
    getUserCoupons(user_id: number): Promise<Coupon[] | null>;
    /**
     * Description 返回指定用户的全部可用优惠劵的总数
     * @param {any} user_id:number
     * @returns {any} number：总数或Boolean：失败
     */
    getAvailableUserCouponsNumber(user_id: number): Promise<number | boolean>;
    /**
     * Description 更新用户持有的优惠劵的状态
     * @param {any} status:number 优惠劵可用状态，1为可用，0为不可用
     * @param {any} user_id:number 用户id
     * @param {any} coupon_id:number 优惠劵id
     * @returns {any} 是否更新成功
     */
    updateUserCouponStatus(status: number, user_id: number, coupon_id: number): Promise<boolean>;
}
