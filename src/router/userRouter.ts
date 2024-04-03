/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 16:21:19
 * @LastEditTime: 2024-03-30 18:48:35
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\router\userRouter.ts
 * @Description: 管理员api路径
 */
import express from 'express'
import UserAuth from '../filter/UserAuth'
import UserController from '../controller/UserController'
require('express-async-errors');  //捕获全局的异步错误

const userRouter = express.Router()

userRouter.post('/login', UserController.login)

userRouter.post('/register', UserController.register)

userRouter.get('/user_info', UserAuth, UserController.getUserInfo)

userRouter.put('/user_info', UserAuth, UserController.updateUserInfo)

userRouter.get('/food', UserController.getFoods)

userRouter.get('/issue-coupons', UserController.getIssueCoupon)

userRouter.get('/user-coupons', UserAuth, UserController.getUserCoupon)

userRouter.post('/user-coupons', UserAuth, UserController.addCoupon)

userRouter.get(
  '/user-payment-pass/exist',
  UserAuth,
  UserController.isUserPaymentExist
)

userRouter.post(
  '/user-payment-pass/validate',
  UserAuth,
  UserController.validatePaymentPass
)

userRouter.put(
  '/user-payment-pass/update',
  UserAuth,
  UserController.updatePaymentPass
)

userRouter.get('/order/type', UserController.getOrderType)

userRouter.put('/user-wallet', UserAuth, UserController.updateUserWallet)

userRouter.get('/order', UserAuth, UserController.getOrder)
userRouter.get('/admin-info', UserAuth, UserController.getAdminInfo)

export default userRouter
