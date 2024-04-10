import Coupon from '../model/Coupon';
interface CouponDao {
    addCoupon(coupon: Coupon): Promise<boolean>;
    addCouponToUser(coupon_id: number, user_id: number): Promise<boolean>;
    findByDate(date: number): Promise<Coupon[]>;
    findUserCoupons(user_id: number): Promise<Coupon[]>;
    findAvailableCountByUserId(user_id: number): Promise<number>;
    updateStatusById(status: number, user_id: number, coupon_id: number): Promise<boolean>;
}
export default CouponDao;
