/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 10:42:57
 * @LastEditTime: 2024-04-03 10:05:22
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\router\adminRouter.ts
 * @Description: 管理员api路径
 */
import express from 'express'
import AdminController from '../controller/AdminController'
import Auth from '../filter/Auth'
import multer from 'multer'
import ConstantUtil from '../utils/ConstantUtil'
require('express-async-errors');  //捕获全局的异步错误
const avatarUpload = multer({ dest: ConstantUtil.uploadAdminProfilePath })
const foodImageUpload = multer({ dest: ConstantUtil.uploadFoodImagePath })



const adminRouter = express.Router()
adminRouter.post('/login', AdminController.adminLogin)
adminRouter.get('/admin_info', Auth, AdminController.getAdminInfo)

adminRouter.put('/admin_info', Auth, AdminController.updateAdminInfo)

adminRouter.post('/pass_validate', Auth, AdminController.validatePass)

adminRouter.put('/pass_update', Auth, AdminController.updatePass)

adminRouter.put(
  '/avatar_upload',
  Auth,
  avatarUpload.any(),
  AdminController.updateAvatar
)

adminRouter.post('/coupon', Auth, AdminController.issueCoupon)

adminRouter.get('/food', Auth, AdminController.getFood)

adminRouter.post('/food', Auth, foodImageUpload.any(), AdminController.addFood)

adminRouter.put('/food', Auth, AdminController.updateFood)

adminRouter.delete('/food', Auth, AdminController.deleteFood)

adminRouter.get('/food_menu', Auth, AdminController.getFoodMenu)

adminRouter.post('/food_menu', Auth, AdminController.addFoodMenu)

adminRouter.put('/food_menu', Auth, AdminController.updateFoodMenuNum)

adminRouter.delete('/food_menu', Auth, AdminController.deleteFoodMenu)
adminRouter.get('/outstanding-order', Auth, AdminController.getOutstandingOrder)

adminRouter.get('/order_search', Auth,AdminController.getOrders)

export default adminRouter
