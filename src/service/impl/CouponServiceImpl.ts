/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 10:31:44
 * @LastEditTime: 2024-03-20 22:45:20
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
  /**
   * Description 向优惠劵库添加新的优惠劵信息
   * @param {any} title:string 优惠劵标题
   * @param {any} discount:number 减免金额
   * @param {any} limit:number  使用限制金额
   * @param {any} create_time:string 生成时间
   * @param {any} expireIn:number 过期时间
   * @returns {any} 是否添加成功的boolean
   */
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
  /**
   * Description 找到距离过期大于指定日数的优惠劵
   * @param {any} date:number 指定日数
   * @returns {any} 优惠劵数组或空
   */
  async getIssueCoupons(date: number): Promise<Coupon[] | null> {
    return await this.couponDao.findByDate(date).catch(() => null)
  }
  /**
   * Description 给指定用户添加指定优惠劵
   * @param {any} coupon_id:number 优惠劵id
   * @param {any} user_id:number 用户id
   * @returns {any} Boolean：是否添加成功
   */
  async getCoupon(coupon_id: number, user_id: number): Promise<boolean> {
    return await this.couponDao
      .addCouponToUser(coupon_id, user_id)
      .catch(() => false)
  }
  /**
   * Description 找到指定用户的所有可用优惠劵
   * @param {any} user_id:number 用户id
   * @returns {any}优惠劵数组或空
   */
  async getUserCoupons(user_id: number): Promise<Coupon[] | null> {
    try {
      let UserCoupons = await this.couponDao.findUserCoupons(user_id)
      return UserCoupons
    } catch (e) {
      return null
    }
  }
  /**
   * Description 返回指定用户的全部可用优惠劵的总数
   * @param {any} user_id:number
   * @returns {any} number：总数或Boolean：失败
   */
  async getAvailableUserCouponsNumber(
    user_id: number
  ): Promise<number | boolean> {
    return await this.couponDao
      .findAvailableCountByUserId(user_id)
      .catch(() => false)
  }
  /**
   * Description 更新用户持有的优惠劵的状态
   * @param {any} status:number 优惠劵可用状态，1为可用，0为不可用
   * @param {any} user_id:number 用户id
   * @param {any} coupon_id:number 优惠劵id
   * @returns {any} 是否更新成功
   */
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
