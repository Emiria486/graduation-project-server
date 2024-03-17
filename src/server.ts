/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 10:34:04
 * @LastEditTime: 2024-03-17 19:00:11
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\server.ts
 * @Description: 服务器入口文件
 */
import express from 'express'
import CouponDaoImpl from './dao/impl/CouponDaoImpl'
const app = express()
const PORT = 3000
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`)
  const couponDao = new CouponDaoImpl()
  let coupon = couponDao.findUserCoupons(1).then()
  console.log('server', coupon)
})
