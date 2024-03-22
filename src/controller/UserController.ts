/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-21 11:04:26
 * @LastEditTime: 2024-03-22 10:42:22
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\controller\UserController.ts
 * @Description: 用户controller实现类
 */
import UserService from '../service/UserService'
import UserServiceImpl from '../service/impl/UserServiceImpl'
import LoginEnum from '../enum/LoginEnum'
import HttpUtil from '../utils/HttpUtil'
import ConstantUtil from '../utils/ConstantUtil'
import User from '../model/User'
import RegisterEnum from '../enum/RegisterEnum'
import FoodMenuService from '../service/FoodMenuService'
import FoodMenuServiceImpl from '../service/impl/FoodMenuServiceImpl'
import FoodMenu from '../model/FoodMenu'
import CouponServiceImpl from '../service/impl/CouponServiceImpl'
import CouponService from '../service/CouponService'
import Coupon from '../model/Coupon'
import OrderService from '../service/OrderService'
import OrderServiceImpl from '../service/impl/OrderServiceImpl'
import Order from '../model/Order'
import AESHelper from '../utils/AESHelper'
import UserMessageEnum from '../enum/UserMessageEnum'
import OrderType from '../model/OrderType'
export default class UserController {
  private static userService: UserService = new UserServiceImpl()
  private static couponService: CouponService = new CouponServiceImpl()
  private static foodMenuService: FoodMenuService = new FoodMenuServiceImpl()
  private static orderService: OrderService = new OrderServiceImpl()
  public static async login(req: any, res: any): Promise<void> {
    const { username, password } = req.body
    const result: LoginEnum | string = await this.userService.login(
      username,
      password
    )
    switch (result) {
      case LoginEnum.serverErr:
        res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        break
      case LoginEnum.usernameErr:
        res.send(HttpUtil.resBody(0, '用户名错误', ''))
        break
      case LoginEnum.passwordErr:
        res.send(HttpUtil.resBody(0, '密码错误！', ''))
        break
      default:
        res.send(HttpUtil.resBody(1, '登录成功！', { token: result }))
        break
    }
  }
  public static async register(req: any, res: any): Promise<void> {
    const { username, password, phone, email } = req.body
    const result: RegisterEnum = await this.userService.register(
      username,
      password,
      email,
      phone
    )
    switch (result) {
      case RegisterEnum.serverErr:
        res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        break
      case RegisterEnum.userExist:
        res.send(
          HttpUtil.resBody(0, '用户名已存在，请换一个新的用户名吧！', '')
        )
        break
      case RegisterEnum.success:
        res.send(HttpUtil.resBody(1, '注册成功', ''))
        break
    }
  }
  public static async getUserInfo(req: any, res: any): Promise<void> {
    const userId: number = req.currentId
    const user = await this.userService.getUserInfo(userId)
    const couponsCount = await this.couponService.getAvailableUserCouponsNumber(
      userId
    )
    if (user && typeof couponsCount === 'number') {
      res.send(
        HttpUtil.resBody(1, '获取用户信息成功', {
          avatar: user.get_avatar(),
          userId: user.get_user_id(),
          username: user.get_username(),
          phone: user.get_phone(),
          address: user.get_address(),
          wallet: user.get_address(),
          couponsCount: couponsCount,
          order: 0,
        })
      )
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async updateUserInfo(req: any, res: any): Promise<void> {
    const userId: number = req.currentId
    const { username, phone, address, email } = req.body
    const result: boolean = await this.userService.updateUserInfo(
      userId,
      username,
      phone,
      address,
      email
    )
    if (result) {
      res.send(HttpUtil.resBody(1, UserMessageEnum.successUpdateUserinfo, ''))
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async getFoods(req: any, res: any): Promise<void> {
    const date = req.query.date
    const foodMenu = await this.foodMenuService.getFoodMenu(date)
    if (foodMenu) {
      res.send(HttpUtil.resBody(1, `${date}的菜单`, foodMenu as any[]))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async getIssueCoupon(req: any, res: any): Promise<void> {
    const date = req.query.date
    const result = await this.couponService.getIssueCoupons(date)
    if (result) {
      res.send(
        HttpUtil.resBody(1, `距离过期大于${date}天的优惠劵`, result as Coupon[])
      )
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async getUserCoupon(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    const result = await this.couponService.getUserCoupons(user_id)
    if (result) {
      res.send(HttpUtil.resBody(1, '用户所有可用优惠劵', result as Coupon[]))
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async addCoupon(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    const coupon_id: number = req.body.coupon_id
    const result = await this.couponService.getCoupon(coupon_id, user_id)
    if (result) {
      res.send(HttpUtil.resBody(1, '领取优惠劵成功！', ''))
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }

  /**
   * Description 确定用户支付密码是否存在
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async isUserPaymentExist(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    const result = await this.userService.getPaymentPass(user_id)
    if (result) {
      res.send(
        HttpUtil.resBody(1, UserMessageEnum.UserPaymentExist, {
          isExist: result,
        })
      )
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async validatePaymentPass(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    // 客户端加密后的支付密码字符串
    const payment_password: string = req.body.payment_password
    // 解密后的支付密码字符串
    const encryptedPassword = AESHelper.encrypt(payment_password)
    // 支付密码正则：只能匹配6位数字
    const regExp: RegExp = new RegExp('/^d{6}$/')
    if (!regExp.test(payment_password)) {
      res
        .status(400)
        .send(HttpUtil.resBody(0, UserMessageEnum.wrongPayPassword, ''))
    }
    const result = await this.userService.validatePaymentPass(
      user_id,
      payment_password
    )
    if (result) {
      res.send(HttpUtil.resBody(1, UserMessageEnum.successPayPassword, ''))
    } else {
      res.send(HttpUtil.resBody(0, UserMessageEnum.wrongPayPassword, ''))
    }
  }
  public static async updatePaymentPass(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    const payment_password: string = req.body.payment_password
    const result = await this.userService.updatePaymentPass(
      user_id,
      payment_password
    )
    if (result) {
      res.send(
        HttpUtil.resBody(1, UserMessageEnum.successUpdatePayPassword, '')
      )
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async getOrderType(req: any, res: any): Promise<void> {
    const orderTypes: OrderType[] = await this.orderService.getOrderType()
    if (orderTypes) {
      res.send(HttpUtil.resBody(1, UserMessageEnum.allOrderTypes, orderTypes))
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async getOrder(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    //记录服务器状态
    let flag: boolean
    const orders: Order[] = await this.orderService.getUserOrders(user_id)
    let orderFoods: any[] | null = []
    if (orders) {
      const orderIds: number[] = orders.map((order) => order.get_order_id())
      orderFoods = await this.orderService.getUserOrderFoods(orderIds)
      flag = !!orderFoods
    } else {
      flag = !!orders
    }
    if (flag) {
      res.send(
        HttpUtil.resBody(1, UserMessageEnum.orderAndFood, {
          orders,
          orderFoods,
        })
      )
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async updateUserWallet(req: any, res: any): Promise<void> {
    // 将总金额转换为负数形式满足mysql的更新
    const price: number = -req.body.price
    const user_id: number = req.currentId
    const wallet = await this.userService.findUserWallet(user_id)
    // 如果查询到钱包余额
    if (!wallet) {
      if ((wallet as number) < Math.abs(price)) {
        res.send(HttpUtil.resBody(0, UserMessageEnum.walletNotEnough, ''))
      } else {
        const result: boolean = await this.userService.updateUserWallet(
          user_id,
          price
        )
        if (result) {
          res.send(HttpUtil.resBody(1, UserMessageEnum.successPay, ''))
        } else {
          res
            .status(500)
            .send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        }
      }
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
}