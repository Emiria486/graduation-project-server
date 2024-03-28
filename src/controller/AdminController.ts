/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-21 11:04:15
 * @LastEditTime: 2024-03-28 19:30:59
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\controller\AdminController.ts
 * @Description: 管理员controller层
 */
import AdminService from '../service/AdminService'
import AdminServiceImpl from '../service/impl/AdminServiceImpl'
import CouponService from '../service/CouponService'
import CouponServiceImpl from '../service/impl/CouponServiceImpl'
import FoodService from '../service/FoodService'
import FoodServiceImpl from '../service/impl/FoodServiceImpl'
import Admin from '../model/Admin'
import Food from '../model/Food'
import FoodMenuService from '../service/FoodMenuService'
import FoodMenuServiceImpl from '../service/impl/FoodMenuServiceImpl'
import FoodMenu from '../model/FoodMenu'
import OrderService from '../service/OrderService'
import OrderServiceImpl from '../service/impl/OrderServiceImpl'
import Order from '../model/Order'
import UserService from '../service/UserService'
import UserServiceImpl from '../service/impl/UserServiceImpl'
import User from '../model/User'
import HttpUtil from '../utils/HttpUtil'
import ConstantUtil from '../utils/ConstantUtil'
import LoginEnum from '../enum/LoginEnum'

export default class AdminController {
  private static instance: AdminController

  private adminService: AdminService
  private couponService: CouponService
  private foodService: FoodService
  private foodMenuService: FoodMenuService
  private orderService: OrderService
  private userService: UserService

  private constructor() {
    this.adminService = new AdminServiceImpl()
    this.couponService = new CouponServiceImpl()
    this.foodService = new FoodServiceImpl()
    this.foodMenuService = new FoodMenuServiceImpl()
    this.orderService = new OrderServiceImpl()
    this.userService = new UserServiceImpl()
  }

  public static getInstance(): AdminController {
    if (!AdminController.instance) {
      AdminController.instance = new AdminController()
    }
    return AdminController.instance
  }

  /**
   * Description 用户登录（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async adminLogin(req: any, res: any): Promise<void> {
    // 使用单例模式获取实例并调用服务方法
    const { username, password } = req.body
    const result: LoginEnum | string =
      await AdminController.getInstance().adminService.login(username, password)
    switch (result) {
      case LoginEnum.serverErr:
        res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
        break
      case LoginEnum.usernameErr:
        res.send(HttpUtil.resBody(0, '用户名不存在！', ''))
        break
      case LoginEnum.passwordErr:
        res.send(HttpUtil.resBody(0, '密码错误！', ''))
        break
      default:
        res.send(HttpUtil.resBody(1, '登录成功！', { token: result }))
        break
    }
  }
  /**
   * Description 获取管理员用户信息（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getAdminInfo(req: any, res: any): Promise<void> {
    const username = req.currentUsername
    const admin: Admin | string =
      await AdminController.getInstance().adminService!.getAdminInfo(username)
    let type = typeof admin
    if (type !== 'string') {
      // 使用类型断言来告诉 TypeScript 变量 admin 的确切类型是 Admin
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
   * Description 验证密码是否正确，（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async validatePass(req: any, res: any): Promise<void> {
    const password: string = req.body.password
    const username: string = req.currentUsername
    console.log('validate', password)
    console.log('username', username)
    const result: boolean =
      await AdminController.getInstance().adminService.validatePass(
        username,
        password
      )
    if (result) {
      res.send(HttpUtil.resBody(1, '验证密码成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, '密码错误！', ''))
    }
  }
  /**
   * Description 更新管理员头像（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async updateAvatar(req: any, res: any) {
    const username = req.currentUsername
    // body类型选择form-data, 然后键名称选择files,对就是上传的图片
    const { originalname, destination, path } = req.files[0]
    const result: boolean =
      await AdminController.getInstance().adminService!.updateAdminAvatar(
        originalname, //用户计算机上的文件的名称
        destination, //保存路径
        path, //已上传文件的完整路径
        username
      )
    if (result) {
      res.send(HttpUtil.resBody(1, '上传成功！', ''))
    } else {
      res.send(HttpUtil.resBody(0, '上传失败', ''))
    }
  }
  /**
   * Description 更新管理员密码（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async updatePass(req: any, res: any): Promise<void> {
    const username: string = req.currentUsername
    const password: string = req.body.password
    const result: boolean =
      await AdminController.getInstance().adminService!.updatePass(
        username,
        password
      )
    if (result) {
      res.send(HttpUtil.resBody(1, '修改成功！', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 管理员新增优惠券（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async issueCoupon(req: any, res: any): Promise<void> {
    const { title, discount, limit, expireIn, create_time } = req.body
    const result =
      await AdminController.getInstance().couponService.issueCoupon(
        title,
        discount,
        limit,
        create_time,
        expireIn
      )
    if (result) {
      res.send(HttpUtil.resBody(1, '优惠券发行成功！', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 获取所有的菜品信息，（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getFood(req: any, res: any): Promise<void> {
    const foods: Food[] | boolean =
      await AdminController.getInstance().foodService.getFoodData()
    if (foods) {
      res.send(HttpUtil.resBody(1, '获取所有菜品信息成功', foods as Food[]))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 更新管理员信息（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async updateAdminInfo(req: any, res: any): Promise<void> {
    let admin = new Admin(
      req.body.password,
      req.currentUsername,
      req.body.phone,
      req.body.avatar,
      req.body.address,
      req.body.shop_name,
      req.body.email
    )
    const result: boolean =
      await AdminController.getInstance().adminService!.updateAdminInfo(admin)
    if (result) {
      res.send(HttpUtil.resBody(1, '信息修改成功！', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 上传菜品的全部信息，包括图片(已测试通过)
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async addFood(req: any, res: any): Promise<void> {
    // 菜品信息在form-data中已json字符串的形式传输
    const { food_name, price, status, description, isdelete } = JSON.parse(
      req.body.food
    )
    const { destination, path, originalname } = req.files[0]
    const result: boolean =
      await AdminController.getInstance().foodService.addFood(
        food_name,
        price,
        status,
        description,
        isdelete,
        destination,
        path,
        originalname
      )
    if (result) {
      res.send(HttpUtil.resBody(1, '菜品添加成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 删除指定id的菜品（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async deleteFood(req: any, res: any): Promise<void> {
    const food_id: number = req.query.food_id
    const isdelete: number = req.query.isdelete
    const result: boolean =
      await AdminController.getInstance().foodService!.deleteFood(
        isdelete,
        food_id
      )
    if (result) {
      res.send(HttpUtil.resBody(1, '删除菜品成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }

  /**
   * Description 更新菜品信息（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async updateFood(req: any, res: any): Promise<void> {
    const { food_name, price, image, status, description, isdelete, food_id } =
      req.body
    const food = new Food(
      food_name,
      price,
      image,
      status,
      description,
      isdelete,
      food_id
    )
    const result: boolean =
      await AdminController.getInstance().foodService!.updateFood(food)
    if (result) {
      res.send(HttpUtil.resBody(1, '更新菜品成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 获取周几的菜单详细信息（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getFoodMenu(req: any, res: any): Promise<void> {
    const date = req.query.date
    const foodMenu: boolean | Food[] =
      await AdminController.getInstance().foodMenuService.getFoodMenu(date)
    if (foodMenu) {
      res.send(HttpUtil.resBody(1, `${date}的菜单`, foodMenu as Food[]))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async addFoodMenu(req: any, res: any): Promise<void> {
    const number: number = req.body.number * 1
    const date: string = req.body.date
    const foods_id: number[] = req.body.foods_id
    const result: boolean | any[] =
      await AdminController.getInstance().foodMenuService!.addFoodMenu(
        foods_id,
        number,
        date
      )
    if (result) {
      res.send(HttpUtil.resBody(1, '添加到菜单成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 修改菜单菜品供应数量（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async updateFoodMenuNum(req: any, res: any): Promise<void> {
    const food_menu_id: number = req.body.food_menu_id
    const number: number = Number(req.body.number)
    const result: boolean =
      await AdminController.getInstance().foodMenuService!.updateFoodMenuNum(
        number,
        food_menu_id
      )
    if (result) {
      res.send(HttpUtil.resBody(1, '修改菜单供应数量成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 删除指定id的菜单条目（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async deleteFoodMenu(req: any, res: any): Promise<void> {
    const food_menu_id: number = req.query.food_menu_id
    const result: boolean =
      await AdminController.getInstance().foodMenuService!.deleteFoodMenu(
        food_menu_id
      )
    if (result) {
      res.send(HttpUtil.resBody(1, '删除指定菜单条目成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }

  /**
   * Description 获取所有未处理的订单，（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getOutstandingOrder(req: any, res: any): Promise<void> {
    interface orderResult {
      foods: Food[]
      userInfo: User
      userOrder: Order
    }
    const orders: Order[] =
      await AdminController.getInstance().orderService.getOutstandingOrder()
    if (orders) {
      const userIds: number[] = [
        ...new Set(orders.map((order) => order.user_id)),
      ]

      let userPromiseArr: any[] = userIds.map((item) =>
        AdminController.getInstance().userService.getUserInfo(item)
      )
      const users = await Promise.all(userPromiseArr)
      let orderIds: number[] = orders.map((order) => order.order_id) as number[]
      console.log('orderIds', orderIds)
      const foods =
        await AdminController.getInstance().orderService.getUserOrderFoods(
          orderIds
        )
      const response: orderResult[] = []
      let foundFoods: any
      orders.forEach((order) => {
        foundFoods = foods?.filter(
          (foodItem) => foodItem.order_id === order.order_id
        )
        if (foundFoods && foundFoods.length > 0) {
          let result: orderResult = {
            foods: foundFoods.map((food: any) => food.food),
            userInfo: users.find((user) => user.user_id === order.user_id),
            userOrder: order,
          }
          console.log('controller的orders', result)
          response.push(result)
        } else {
          console.error('未找到匹配的食物信息')
        }
      })
      console.log('发送的响应', response)
      res.send(HttpUtil.resBody(1, '所有未完成的订单', response))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  /**
   * Description 分页查询订单（已测试通过）
   * @param {any} req:any
   * @param {any} res:any
   * @returns {any}
   */
  public static async getOrders(req: any, res: any): Promise<void> {
    const pageStart = parseInt(req.query.pageStart)
    const pageSize = parseInt(req.query.pageSize)
    const startTime = req.query.startTime
    const endTime = req.query.endTime
    const orders: Order[] =
      await AdminController.getInstance().orderService.getOrdersByPaginationAndDate(
        pageStart,
        pageSize,
        startTime,
        endTime
      )
    const userIds: number[] = [...new Set(orders.map((order) => order.user_id))]
    const users = await Promise.all(
      userIds.map((id) =>
        AdminController.getInstance().userService!.getUserInfo(id)
      )
    )
    const filteredOrders = orders.filter(
      (order) => order !== undefined && order.order_id !== undefined
    )
    const orderIds: number[] = filteredOrders.map(
      (order) => order!.order_id
    ) as number[]
    const orderFoods =
      await AdminController.getInstance().orderService!.getUserOrderFoods(
        orderIds
      )
    const count: number | boolean =
      await AdminController.getInstance().orderService!.getOrdersCount(
        startTime,
        endTime
      )
    if (orders) {
      res.send(
        HttpUtil.resBody(1, '已获得分页订单数据', {
          orders,
          users,
          orderFoods,
          count,
        })
      )
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
}
