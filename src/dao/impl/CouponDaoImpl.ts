/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 14:40:55
 * @LastEditTime: 2024-03-17 19:03:27
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\impl\CouponDaoImpl.ts
 * @Description: 优惠劵dao层实现类
 */
import Coupon from '../../model/Coupon'
import DBUtil from '../../utils/DBUtil'
import CouponDao from '../CouponDao'
export default class CouponDaoImpl implements CouponDao {
  pool = DBUtil.createPoolConnection()
  sql: string = ''
  sqlParams: Array<any> = []
  addCoupon(coupon: Coupon): Promise<boolean> {
    this.sql =
      'insert into `coupon`(`title`,`discount`,`use_limit`,`create_time`,`expirein`) values(?,?,?,?,?)'
    this.sqlParams = [
      coupon.get_title(),
      coupon.get_discount(),
      coupon.get_limit(),
      coupon.get_create_time(),
      coupon.get_expirein(),
    ]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else resolve(true)
      })
    })
  }
  addCouponToUser(coupon_id: number, user_id: number): Promise<boolean> {
    this.sql = 'insert into `user_coupon`(`coupon_id`,`user_id`)values(?,?)'
    this.sqlParams = [coupon_id, user_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else resolve(true)
      })
    })
  }
  findByDate(date: number): Promise<Coupon[]> {
    this.sql = 'select * from `coupon` where `expirein` > ?'
    this.sqlParams = [date]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, results) => {
        if (err) reject(err)
        else resolve(results as Coupon[])
      })
    })
  }
  findUserCoupons(user_id: number): Promise<Coupon[]> {
    this.sql =
      'select * from `coupon` where `coupon_id` = (select `coupon_id` from `user_coupon` where `user_id` =?)'
    this.sqlParams = [user_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result) => {
        if (err) reject(err)
        else {
          console.log('userCoupons', result)
          resolve(result as Coupon[])
        }
      })
    })
  }
  findAvailableCountByUserId(user_id: number): Promise<number> {
    this.sql =
      'select count(*) as count from `user_coupon` where `user_id` = ? and `status` = ?'
    this.sqlParams = [user_id, 1]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('count' + result[0].count)
          resolve(result[0].count)
        }
      })
    })
  }
  updateStatusById(
    status = 0,
    user_id: number,
    coupon_id: number
  ): Promise<boolean> {
    this.sql =
      'update `user_coupon` set `status` = ? where `user_id` = ? and `coupon_id` = ?'
    this.sqlParams = [status, user_id, coupon_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else resolve(true)
      })
    })
  }
}
