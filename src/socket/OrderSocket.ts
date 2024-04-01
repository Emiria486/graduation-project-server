/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-21 09:07:13
 * @LastEditTime: 2024-04-01 12:52:12
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\socket\OrderSocket.ts
 * @Description: 实现订单状态实时更改(用户预订socket功能测试通过，管理员实时推送没有测试)
 */
const ws = require('nodejs-websocket')
import OrderService from '../service/OrderService'
import OrderServiceImpl from '../service/impl/OrderServiceImpl'
import Order from '../model/Order'
import CouponService from '../service/CouponService'
import CouponServiceImpl from '../service/impl/CouponServiceImpl'
import HttpUtil from '../utils/HttpUtil'
import UserService from '../service/UserService'
import UserServiceImpl from '../service/impl/UserServiceImpl'
import ConstantUtil from '../utils/ConstantUtil'
import AdminService from '../service/AdminService'
import AdminServiceImpl from '../service/impl/AdminServiceImpl'
import Admin from '../model/Admin'
import Food from '../model/Food'
import User from '../model/User'

const PORT: number = 9527
const adminService: AdminService = new AdminServiceImpl()
const orderService: OrderService = new OrderServiceImpl()
const couponService: CouponService = new CouponServiceImpl()
const userService: UserService = new UserServiceImpl()
const orderSocket = () => {
  let server = ws
    .createServer((connection: any) => {
      // 解析字符串使用，这里我们使用的json字符串
      connection.on('text', async function (JSONData: any) {
        console.log('发送的订单信息', JSONData)
        const body = JSON.parse(JSONData)
        console.log('body', body)
        let admins: Admin[] = await adminService.findAllAdmin()
        // 解构取值获得用户名属性值并进行比对
        const adminInfo = admins.find(
          ({ username }) => username === body.username
        )
        if (adminInfo !== undefined) {
          //查询用户信息、订单信息、选购信息
          interface orderResult {
            foods: Food[]
            userInfo: User
            userOrder: Order
          }
          const orders: Order[] = await orderService.getOutstandingOrder()
          if (orders) {
            const userIds: number[] = [
              ...new Set(orders.map((order) => order.user_id)),
            ]
            let userPromiseArr: any[] = userIds.map((item) =>
              userService.getUserInfo(item)
            )
            const users = await Promise.all(userPromiseArr)
            let orderIds: number[] = orders.map(
              (order) => order.order_id
            ) as number[]
            const foods = await orderService.getUserOrderFoods(orderIds)
            const response: orderResult[] = []
            let foundFoods: any
            orders.forEach((order) => {
              foundFoods = foods?.filter(
                (foodItem) => foodItem.order_id === order.order_id
              )
              if (foundFoods && foundFoods.length > 0) {
                let result: orderResult = {
                  foods: foundFoods.map((food: any) => food.food),
                  userInfo: users.find(
                    (user) => user.user_id === order.user_id
                  ),
                  userOrder: order,
                }
                response.push(result)
              } else {
                console.error('未找到匹配的食物信息')
              }
            })
            connection.send(
              JSON.stringify(HttpUtil.resBody(1, '所有未完成的订单', response))
            )
          } else {
            connection.send(
              JSON.stringify(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
            )
          }
        } else {
          // 不是管理员登录进行用户预订的相关数据操作
          const order: Order = new Order(
            body.user_id,
            body.user_phone,
            body.status,
            body.create_time,
            body.order_type,
            body.price,
            body.discount,
            body.address
          )
          // 将订单数据插入数据库
          let OrderRes = await orderService.addOrder(
            order,
            body.user_id,
            body.foods
          )
          // 优惠券处理
          if (body.coupon_id !== undefined) {
            //更新优惠券状态
            let couponRes: boolean = await couponService.updateUserCouponStatus(
              0,
              body.user_id,
              body.coupon_id
            )
          }
          if (OrderRes) {
            connection.send(JSON.stringify(HttpUtil.resBody(1, '预订成功', '')))
          } else {
            connection.send(
              JSON.stringify(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
            )
          }
        }
      })
      connection.on('connect', function (code: any) {
        console.log('开启连接', code)
      })
      connection.on('close', function (code: any) {
        console.log('关闭连接', code)
      })
      connection.on('error', function (code: any) {
        console.log('异常关闭', code)
      })
      return server
    })
    .listen(PORT)
}
export default orderSocket
