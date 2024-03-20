/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 14:40:55
 * @LastEditTime: 2024-03-19 12:21:14
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
  /**
   * Description 添加一条优惠劵信息(已测试成功)
   * @param {any} coupon:Coupon 用户卷类
   * @returns {any} boolean的promise
   */
  addCoupon(coupon: Coupon): Promise<boolean> {
    this.sql =
      'insert into `coupon`(`title`,`discount`,`limit`,`create_time`,`expirein`) values(?,?,?,?,?)'
    this.sqlParams = [
      coupon.get_title(),
      coupon.get_discount(),
      coupon.get_limit(),
      coupon.get_create_time(),
      coupon.get_expirein(),
    ]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(err)
        else {
          console.log('addCoupon:成功')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 给指定id的用户添加指定优惠劵(已测试成功)
   * @param {any} coupon_id:number 优惠劵id
   * @param {any} user_id:number  用户id
   * @returns {any} Boolean的promise
   */
  addCouponToUser(coupon_id: number, user_id: number): Promise<boolean> {
    this.sql =
      'insert into `user_coupon`(`coupon_id`,`user_id`,`status`)values(?,?,1)'
    this.sqlParams = [coupon_id, user_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(err)
        else {
          console.log('addCouponToUser:成功')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 找到有效期大于指定天数的优惠劵(已测试成功)
   * @param {any} date:number 指定天数
   * @returns {any} coupon[]的promise
   */
  findByDate(date: number): Promise<Coupon[]> {
    this.sql = 'select * from `coupon` where `expirein` > ?'
    this.sqlParams = [date]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, results) => {
        if (err) reject(err)
        else {
          console.log('findByDate:成功')
          console.log('有效期大于' + date + '天的优惠劵', results)
          resolve(results as Coupon[])
        }
      })
    })
  }
  /**
   * Description 找到指定用户的所有可用优惠劵(已测试成功)
   * @param {any} user_id:number 用户id
   * @returns {any} coupon[]
   */
  findUserCoupons(user_id: number): Promise<Coupon[]> {
    this.sql =
      'select * from `coupon` where `coupon_id` in (select `coupon_id` from `user_coupon` where `user_id` =? and status=1)'
    this.sqlParams = [user_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result) => {
        if (err) reject(err)
        else {
          console.log('findUserCoupons:成功', result)
          resolve(result as Coupon[])
        }
      })
    })
  }
  /**
   * Description 查询指定用户的所有可用优惠劵数量（已测试成功）
   * @param {any} user_id:number 用户id
   * @returns {any} number的promise
   */
  findAvailableCountByUserId(user_id: number): Promise<number> {
    this.sql =
      'select count(*) as count from `user_coupon` where `user_id` = ? and `status` = ?'
    this.sqlParams = [user_id, 1]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log(
            'findAvailableCountByUserId:成功，数量为' + result[0].count
          )
          resolve(result[0].count)
        }
      })
    })
  }
  /**
   * Description 更新指定用户的优惠劵可用状态(已测试成功)
   * @param {any} status=0 优惠劵状态默认为0，调整为不可用
   * @param {any} user_id:number 用户id
   * @param {any} coupon_id:number 优惠劵id
   * @returns {any} Boolean的promise
   */
  updateStatusById(
    status: any = 0,
    user_id: number,
    coupon_id: number
  ): Promise<boolean> {
    this.sql =
      'update `user_coupon` set `status` = ? where `user_id` = ? and `coupon_id` = ?'
    this.sqlParams = [status, user_id, coupon_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(err)
        else {
          console.log("updateStatusById:成功")
          resolve(true)
        }
      })
    })
  }
}
