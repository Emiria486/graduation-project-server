/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-21 11:04:26
 * @LastEditTime: 2024-03-30 19:48:16
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
import AdminService from '../service/AdminService'
import AdminServiceImpl from '../service/impl/AdminServiceImpl'
import Admin from '../model/Admin'
export default class UserController {
  private static instance: UserController
  private userService: UserService
  private couponService: CouponService
  private foodMenuService: FoodMenuService
  private orderService: OrderService
  private adminService: AdminService

  constructor() {
    this.userService = new UserServiceImpl()
    this.couponService = new CouponServiceImpl()
    this.foodMenuService = new FoodMenuServiceImpl()
    this.orderService = new OrderServiceImpl()
    this.adminService = new AdminServiceImpl()
  }
  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController()
    }
    return UserController.instance
  }
  /**
   * Description 用于用户获取管理员信息
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getAdminInfo(req: any, res: any): Promise<void> {
    const admin = await UserController.getInstance().adminService.getAdminInfo(
      ConstantUtil.adminName
    )
    let type = typeof admin
    if (type !== 'string') {
      const adminData = admin as Admin
      res.send(
        HttpUtil.resBody(1, 'success', {
          admin_id: adminData.get_admin_id(),
          password: adminData.get_password(),
          username: adminData.get_username(),
          phone: adminData.get_phone(),
          avatar: adminData.get_avatar(),
          address: adminData.get_address(),
          shop_name: adminData.get_shop_name(),
          email: adminData.get_email(),
        })
      )
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 用户登录（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async login(req: any, res: any): Promise<void> {
    const { username, password } = req.body
    const result: LoginEnum | string =
      await UserController.getInstance().userService.login(username, password)
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
        console.log('login生成的token', result)
        res.send(HttpUtil.resBody(1, '登录成功！', { token: result }))
        break
    }
  }
  /**
   * Description 新用户注册（已测试成功）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async register(req: any, res: any): Promise<void> {
    const { username, password, phone, email } = req.body
    const result: RegisterEnum =
      await UserController.getInstance().userService.register(
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
  /**
   * Description 获取用户信息（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getUserInfo(req: any, res: any): Promise<void> {
    const userId: number = req.currentId
    const user = await UserController.getInstance().userService.getUserInfo(
      userId
    )
    const couponsCount =
      await UserController.getInstance().couponService.getAvailableUserCouponsNumber(
        userId
      )
    const allOrderNum =
      await UserController.getInstance().orderService.getAllOrderCountNumber(
        userId
      )
    if (user && typeof couponsCount === 'number') {
      res.send(
        HttpUtil.resBody(1, '获取用户信息成功', {
          avatar: user.avatar,
          userId: user.user_id,
          username: user.username,
          phone: user.phone,
          address: user.address,
          wallet: Number(user.wallet),
          couponsCount: couponsCount,
          email: user.email,
          order: 0,
          allOrderNum: allOrderNum,
        })
      )
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 更新用户信息（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async updateUserInfo(req: any, res: any): Promise<void> {
    const userId: number = req.currentId
    const { username, phone, address, email } = req.body
    const result: boolean =
      await UserController.getInstance().userService.updateUserInfo(
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
  /**
   * Description 获取周几的菜单（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getFoods(req: any, res: any): Promise<void> {
    const date = req.query.date
    const foodMenu =
      await UserController.getInstance().foodMenuService.getFoodMenu(date)
    if (foodMenu) {
      res.send(HttpUtil.resBody(1, `${date}的菜单`, foodMenu as any[]))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 找到有效期大于指定日期的优惠券（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getIssueCoupon(req: any, res: any): Promise<void> {
    const date = req.query.date
    const result =
      await UserController.getInstance().couponService.getIssueCoupons(date)
    if (result != null && result.length > 0) {
      res.send(
        HttpUtil.resBody(1, `距离过期大于${date}天的优惠劵`, result as Coupon[])
      )
    } else if (result != null && result.length === 0) {
      res.send(HttpUtil.resBody(0, `没有距离过期大于${date}天的优惠劵`, ''))
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 查询用户所有可以优惠劵（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getUserCoupon(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    const result =
      await UserController.getInstance().couponService.getUserCoupons(user_id)
    if (result) {
      res.send(HttpUtil.resBody(1, '用户所有可用优惠劵', result as Coupon[]))
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 用户登录指定id的优惠券（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async addCoupon(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    const coupon_id: number = req.body.coupon_id
    console.log('addCoupon参数', user_id, coupon_id)
    const result = await UserController.getInstance().couponService.getCoupon(
      coupon_id,
      user_id
    )
    if (result) {
      res.send(HttpUtil.resBody(1, '领取优惠劵成功！', ''))
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }

  /**
   * Description 确定用户支付密码是否存在(已测试通过)
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async isUserPaymentExist(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    const result =
      await UserController.getInstance().userService.getPaymentPass(user_id)
    if (result) {
      res.send(
        HttpUtil.resBody(1, UserMessageEnum.UserPaymentExist, {
          isExist: result,
        })
      )
    } else {
      res.send(HttpUtil.resBody(0, UserMessageEnum.UserPaymentNotExist, ''))
    }
  }
  /**
   * Description 检验用户的支付密码是否正确（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async validatePaymentPass(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    // 客户端加密后的支付密码字符串
    const payment_password: string = req.body.payment_password
    // 解密后的支付密码字符串
    const encryptedPassword = AESHelper.decrypt(payment_password)
    console.log('解密后的支付密码', encryptedPassword)
    // 支付密码正则：只能匹配6位数字
    const regExp: RegExp = new RegExp(/^\d{6}$/)
    console.log('判断结果未取反', regExp.test(encryptedPassword))
    if (!regExp.test(encryptedPassword)) {
      return res
        .status(400)
        .send(HttpUtil.resBody(0, UserMessageEnum.UserPaymentNot6, ''))
    }
    const result =
      await UserController.getInstance().userService.validatePaymentPass(
        user_id,
        payment_password
      )
    if (result) {
      res.send(HttpUtil.resBody(1, UserMessageEnum.successPayPassword, ''))
    } else {
      res.send(HttpUtil.resBody(0, UserMessageEnum.wrongPayPassword, ''))
    }
  }
  /**
   * Description 更新支付密码（已通过测试）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async updatePaymentPass(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    const payment_password: string = req.body.payment_password //加密后的支付密码
    const result =
      await UserController.getInstance().userService.updatePaymentPass(
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
  /**
   * Description 获取所有的就餐方式选项（已通过测试）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getOrderType(req: any, res: any): Promise<void> {
    const orderTypes: OrderType[] =
      await UserController.getInstance().orderService.getOrderType()
    if (orderTypes) {
      res.send(HttpUtil.resBody(1, UserMessageEnum.allOrderTypes, orderTypes))
    } else {
      res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 获取指定用户的全部订单（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getOrder(req: any, res: any): Promise<void> {
    const user_id: number = req.currentId
    //记录服务器状态
    let flag: boolean
    const orders: Order[] =
      await UserController.getInstance().orderService.getUserOrders(user_id)
    let orderFoods: any[] | null = []
    if (orders) {
      const orderIds: number[] = orders.map(
        (order) => order.order_id
      ) as number[]
      orderFoods =
        await UserController.getInstance().orderService.getUserOrderFoods(
          orderIds
        )
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
  /**
   * Description 更新用户的钱包余额(已测试通过)
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async updateUserWallet(req: any, res: any): Promise<void> {
    // 将总金额转换为负数形式满足mysql的更新
    const price: number = -req.body.price
    const user_id: number = req.currentId
    const wallet =
      await UserController.getInstance().userService.findUserWallet(user_id)
    // 如果查询到钱包余额
    if (wallet) {
      if ((wallet as number) < Math.abs(price)) {
        res.send(HttpUtil.resBody(0, UserMessageEnum.walletNotEnough, ''))
      } else {
        const result: boolean =
          await UserController.getInstance().userService.updateUserWallet(
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
