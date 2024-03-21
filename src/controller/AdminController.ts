/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-21 11:04:15
 * @LastEditTime: 2024-03-21 18:58:02
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
  private static adminService: AdminService = new AdminServiceImpl()
  private static couponService: CouponService = new CouponServiceImpl()
  private static foodService: FoodService = new FoodServiceImpl()
  private static foodMenuService: FoodMenuService = new FoodMenuServiceImpl()
  private static orderService: OrderService = new OrderServiceImpl()
  private static userService: UserService = new UserServiceImpl()
  public static async ControllerTest(req: any, res: any): Promise<void> {
    res.send('hello world!')
  }

  public static async adminLogin(req: any, res: any): Promise<void> {
    const { username, password } = req.body
    const result: LoginEnum | string = await this.adminService.login(
      username,
      password
    )
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
  public static async getAdminInfo(req: any, res: any): Promise<void> {
    const username = req.currentUsername
    const admin: Admin | string = await this.adminService.getAdminInfo(username)
    if (admin instanceof Admin) {
      res.send(
        HttpUtil.resBody(1, 'success', {
          admin_id: admin.get_admin_id(),
          password: admin.get_password,
          username: admin.get_username(),
          phone: admin.get_phone(),
          avatar: admin.get_avatar(),
          address: admin.get_address(),
          shop_name: admin.get_shop_name(),
          email: admin.get_email(),
        })
      )
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async validatePass(req: any, res: any): Promise<void> {
    const password: string = req.body.password
    const username: string = req.currentUsername
    const result: boolean = await this.adminService.validatePass(
      username,
      password
    )
    if (result) {
      res.send(HttpUtil.resBody(1, 'ok', ''))
    } else {
      res.send(HttpUtil.resBody(0, '密码错误！', ''))
    }
  }
  public static async updateAvatar(req: any, res: any) {
    const username: string = req.currentUsername
    const { originalname, destination, path } = req.files[0]
    const result: boolean = await this.adminService.updateAdminAvatar(
      originalname,
      destination,
      path,
      username
    )
    if (result) {
      res.send(HttpUtil.resBody(1, '上传成功！', ''))
    } else {
      res.send(HttpUtil.resBody(0, '上传失败', ''))
    }
  }
  public static async updatePass(req: any, res: any): Promise<void> {
    const username: string = req.currentUsername
    const password: string = req.body.password
    const result: boolean = await this.adminService.updatePass(
      username,
      password
    )
    if (result) {
      res.send(HttpUtil.resBody(1, '修改成功！', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async issueCoupon(req: any, res: any): Promise<void> {
    const { title, discount, limit, expireIn, create_time } = req.body
    const result = await this.couponService.issueCoupon(
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
  public static async getFood(req: any, res: any): Promise<void> {
    const foods: Food[] | boolean = await this.foodService.getFoodData()
    if (foods) {
      res.send(HttpUtil.resBody(1, 'ok', foods as Food[]))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async updateAdminInfo(req: any, res: any): Promise<void> {
    let admin = new Admin(
      req.body.password,
      req.currentUsername,
      req.body.phone,
      req.body.avatar,
      req.body.address,
      req.body_shop_name,
      req.body.email
    )
    const result: boolean = await this.adminService.updateAdminInfo(admin)
    if (result) {
      res.send(HttpUtil.resBody(1, '信息修改成功！', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async addFood(req: any, res: any): Promise<void> {
    const { food_name, price, status, description } = req.body
    const { destination, path, filename } = req.files[0]
    const result: boolean = await this.foodService.addFood(
      food_name,
      price,
      status,
      description,
      destination,
      path,
      filename
    )
    if (result) {
      res.send(HttpUtil.resBody(1, '菜品添加成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async deleteFood(req: any, res: any): Promise<void> {
    const food_id: number = req.query.food_id
    const result: boolean = await this.foodService.deleteFood(food_id)
    if (result) {
      res.send(HttpUtil.resBody(1, '删除菜品成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async updateFood(req: any, res: any): Promise<void> {
    const { food_name, price, status, image, description, food_id } = req.body
    const food = new Food(food_name, price, image, status, description, food_id)
    const result: boolean = await this.foodService.updateFood(food)
    if (result) {
      res.send(HttpUtil.resBody(1, '更新菜品成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async getFoodMenu(req: any, res: any): Promise<void> {
    const date = req.query.date
    const foodMenu: boolean | Food[] = await this.foodMenuService.getFoodMenu(
      date
    )
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
    const result: boolean | any[] = await this.foodMenuService.addFoodMenu(
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
  public static async updateFoodMenuNum(req: any, res: any): Promise<void> {
    const food_menu_id: number = req.body.food_menu_id
    const number: number = Number(req.body.number)
    const result: boolean = await this.foodMenuService.updateFoodMenuNum(
      number,
      food_menu_id
    )
    if (result) {
      res.send(HttpUtil.resBody(1, 'ok', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async deleteFoodMenu(req: any, res: any): Promise<void> {
    const food_menu_id: number = req.query.food_menu_id
    const result: boolean = await this.foodMenuService.deleteFoodMenu(
      food_menu_id
    )
    if (result) {
      res.send(HttpUtil.resBody(1, '删除指定菜单条目成功', ''))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async getOutstandingOrder(req: any, res: any): Promise<void> {
    interface orderResult {
      foods: Food[]
      userInfo: User
      userOrder: Order
    }
    const orders: Order[] = await this.orderService.getOutstandingOrder()
    if (orders) {
      let userIds: number[] = [
        ...new Set(orders.map((order) => order.get_user_id())),
      ]
      let userPromiseArr: any[] = userIds.map((item) =>
        this.userService.getUserInfo(item)
      )
      const users = await Promise.all(userPromiseArr)
      let orderIds: number[] = orders.map((order) => order.get_order_id())
      const foods = await this.orderService.getUserOrderFoods(orderIds)
      const response: orderResult[] = []
      orders.forEach((order) => {
        let result: orderResult = {
          foods: foods?.find((food) => food.order_id === order.get_order_id)
            .food,
          userInfo: users.find(
            (user) => user.get_user_id() === order.get_user_id()
          ),
          userOrder: order,
        }
        response.push(result)
      })
      res.send(HttpUtil.resBody(1, '所有未完成的订单', response))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
  public static async getOrders(req: any, res: any): Promise<void> {
    const pageStart = parseInt(req.query.pageStart)
    const pageSize = parseInt(req.query.pageSize)
    const startTime = req.query.startTime
    const endTime = req.query.endTime
    const orders: Order[] =
      await this.orderService.getOrdersByPaginationAndDate(
        pageStart,
        pageSize,
        startTime,
        endTime
      )
    const userIds: number[] = [
      ...new Set(orders.map((order) => order.get_user_id())),
    ]
    const users = await Promise.all(
      userIds.map((id) => this.userService.getUserInfo(id))
    )
    const orderFoods = await this.orderService.getUserOrderFoods(
      orders.map((order) => order.get_order_id())
    )
    const count: number | boolean = await this.orderService.getOrdersCount(
      startTime,
      endTime
    )
    if (orders) {
      res.send(HttpUtil.resBody(1, 'ok', { orders, users, orderFoods, count }))
    } else {
      res.send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
    }
  }
}
