/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 10:18:58
 * @LastEditTime: 2024-03-20 10:30:56
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\CouponService.ts
 * @Description: 优惠劵service接口定义
 */
import Coupon from '../model/Coupon'
export default interface CouponService {
  /**
   * Description 添加优惠劵
   */
  issueCoupon(
    title: string,
    discount: number,
    limit: number,
    create_time: string,
    expireIn: number
  ): Promise<boolean>
  /**
   * Description 找到有效期大于几天的优惠劵
   */
  getIssueCoupons(date: number): Promise<Coupon[] | null>
  /**
   * Description  给指定用户添加指定优惠劵
   */
  getCoupon(coupon_id: number, user_id: number): Promise<boolean>
  /**
   * Description  找到指定用户的所有可用优惠劵
   */
  getUserCoupons(user_id: number): Promise<Coupon[] | null>
  /**
   * Description  找到指定用户的可用优惠劵的总数
   */
  getAvailableUserCouponsNumber(user_id: number): Promise<number | boolean>
  updateUserCouponStatus(status:number,user_id: number, coupon_id: number): Promise<boolean>
}
