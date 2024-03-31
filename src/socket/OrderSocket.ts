/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-21 09:07:13
 * @LastEditTime: 2024-03-31 12:19:30
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
import OrderTypeEnum from '../enum/OrderTypeEnum'

const PORT: number = 9527
const ADMIN: String = 'liuyongjie'

const orderSocket = () => {
  let server = ws
    .createServer((connection: any) => {
      // 解析字符串使用，这里我们使用的json字符串
      connection.on('text', async function (JSONData: any) {
        console.log('发送的订单信息', JSONData)
        const body = JSON.parse(JSONData)
        const orderService: OrderService = new OrderServiceImpl()
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
        if (body.coupon_id) {
          const couponService: CouponService = new CouponServiceImpl()
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
          connection.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
        //如果是外卖订单服务器反馈信息
        if (body.order_type === OrderTypeEnum.WaiMai) {
          for (const item of server.connections) {
            if (item.username === ADMIN) {
              //查询用户信息、订单信息、选购信息
              const UserService: UserService = new UserServiceImpl()
              const orderService: OrderService = new OrderServiceImpl()
              let flag: boolean //记录服务器状态
              const [userInfo, userOrder] = await Promise.all([
                UserService.getUserInfo(order.user_id),
                orderService.getUserNewOrder(order.user_id),
              ])
              let foods: any[] = []
              if (userInfo && userOrder) {
                foods = await orderService.getUserNewOrderFoods(
                  userOrder.order_id as number
                )
                flag = !!foods
              } else {
                flag = false
              }
              if (flag) {
                item.send(
                  JSON.stringify(
                    HttpUtil.resBody(1, '新的订单', {
                      userInfo,
                      userOrder,
                      foods,
                    })
                  )
                )
              } else {
                item.send(
                  JSON.stringify(
                    HttpUtil.resBody(0, ConstantUtil.serverErrMsg, '')
                  )
                )
              }
            }
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
