/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-21 09:07:13
 * @LastEditTime: 2024-03-22 17:46:46
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\socket\OrderSocket.ts
 * @Description: 实现订单状态实时更改
 */
const ws = require("nodejs-websocket")
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

export function orderSocket() {
  const server = ws.createServer((conn: any) => {
    // text
    conn.on('text', async (data: string) => {
      const body = JSON.parse(data)
      conn.username = body.username
      if (conn.username !== ADMIN) {
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
        let OrderRes: boolean = await orderService.addOrder(
          order,
          body.user_id,
          body.foods
        )
        // 优惠劵处理
        if (body.coupon_id) {
          const couponService: CouponService = new CouponServiceImpl()
          let CouponRes = await couponService.updateUserCouponStatus(
            0,
            body.user_id,
            body.coupon_id
          )
        }
        //服务器返回数据给用户
        if (OrderRes) {
          conn.send(JSON.stringify(HttpUtil.resBody(1, '预订成功', '')))
        } else {
          conn.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
        //如果是外卖订单服务器反馈信息
        if (body.order_type === OrderTypeEnum.WaiMai) {
          for (let item of server.connections) {
            if (item.username === ADMIN) {
              //查询用户信息、订单信息、选购信息
              const UserService: UserService = new UserServiceImpl()
              const orderService: OrderService = new OrderServiceImpl()
              let flag: boolean //记录服务器状态
              const [userInfo, userOrder] = await Promise.all([
                UserService.getUserInfo(order.get_user_id()),
                orderService.getUserNewOrder(order.get_user_id()),
              ])
              let foods: any[]=[]
              if (userInfo && userOrder) {
                foods = await orderService.getUserNewOrderFoods(
                  userOrder.get_order_id()
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
      }
    })
    //close 不作处理
    conn.on('close', () => {})
    //error 捕捉不作处理
    conn.on('error', (error: any) => {
      console.log(error)
    })
  })
  server.listen(PORT, () => {
    console.log('websocket server is running in 9527')
  })
}
