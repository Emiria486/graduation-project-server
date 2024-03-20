/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 10:31:44
 * @LastEditTime: 2024-03-20 11:24:46
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\impl\CouponServiceImpl.ts
 * @Description: 优惠劵service的实现类
 */
import CouponService from '../CouponService'
import Coupon from '../../model/Coupon'
import CouponDao from '../../dao/CouponDao'
import CouponDaoImpl from '../../dao/impl/CouponDaoImpl'
export default class CouponServiceImpl implements CouponService {
  private couponDao: CouponDao
  constructor() {
    this.couponDao = new CouponDaoImpl()
  }
  async issueCoupon(
    title: string,
    discount: number,
    limit: number,
    create_time: string,
    expireIn: number
  ): Promise<boolean> {
    const coupon: Coupon = new Coupon(
      title,
      discount,
      limit,
      create_time,
      expireIn
    )
    return await this.couponDao.addCoupon(coupon).catch((e) => {
      return false
    })
  }
  async getIssueCoupons(date: number): Promise<Coupon[] | null> {
    return await this.couponDao.findByDate(date).catch(() => null)
  }
  async getCoupon(coupon_id: number, user_id: number): Promise<boolean> {
    return await this.couponDao
      .addCouponToUser(coupon_id, user_id)
      .catch(() => false)
  }
  async getUserCoupons(user_id: number): Promise<Coupon[] | null> {
    try {
      let UserCoupons = await this.couponDao.findUserCoupons(user_id)
      return UserCoupons
    } catch (e) {
      return null
    }
  }
  async getAvailableUserCouponsNumber(
    user_id: number
  ): Promise<number | boolean> {
    return await this.couponDao
      .findAvailableCountByUserId(user_id)
      .catch(() => false)
  }
  async updateUserCouponStatus(
    status: number,
    user_id: number,
    coupon_id: number
  ): Promise<boolean> {
    return this.couponDao
      .updateStatusById(status, user_id, coupon_id)
      .catch((e) => false)
  }
}
