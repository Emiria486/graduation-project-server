/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-21 11:04:26
 * @LastEditTime: 2024-03-21 19:19:24
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\controller\UserController.ts
 * @Description: 用户controller实现类
 */
import UserService from "../service/UserService";
import UserServiceImpl from "../service/impl/UserServiceImpl";
import LoginEnum from "../enum/LoginEnum";
import HttpUtil from "../utils/HttpUtil";
import ConstantUtil from "../utils/ConstantUtil";
import User from "../model/User";
import RegisterEnum from "../enum/RegisterEnum";
import FoodMenuService from "../service/FoodMenuService";
import FoodMenuServiceImpl from "../service/impl/FoodMenuServiceImpl";
import FoodMenu from "../model/FoodMenu";
import CouponServiceImpl from "../service/impl/CouponServiceImpl";
import CouponService from "../service/CouponService";
import Coupon from "../model/Coupon";
import OrderService from "../service/OrderService";
import OrderServiceImpl from "../service/impl/OrderServiceImpl";
import Order from "../model/Order";

export default class UserController{
    
}