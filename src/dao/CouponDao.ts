/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 09:21:47
 * @LastEditTime: 2024-03-17 16:19:13
//  * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\CouponDao.ts
 * @Description: 优惠劵dao接口定义
 */
import Coupon from '../model/Coupon'
interface CouponDao {
  addCoupon(coupon: Coupon): Promise<boolean>
  addCouponToUser(coupon_id: number, user_id: number): Promise<boolean>
  findByDate(date: number): Promise<Coupon[]>
  findUserCoupons(user_id: number): Promise<Coupon[]>
  findAvailableCountByUserId(user_id: number): Promise<number>
  updateStatusById(
    status: number,
    user_id: number,
    coupon_id: number
  ): Promise<boolean>
}
export default CouponDao
