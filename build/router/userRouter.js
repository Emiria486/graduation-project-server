"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 16:21:19
 * @LastEditTime: 2024-03-30 18:48:35
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\router\userRouter.ts
 * @Description: 管理员api路径
 */
var express_1 = __importDefault(require("express"));
var UserAuth_1 = __importDefault(require("../filter/UserAuth"));
var UserController_1 = __importDefault(require("../controller/UserController"));
require('express-async-errors'); //捕获全局的异步错误
var userRouter = express_1.default.Router();
userRouter.post('/login', UserController_1.default.login);
userRouter.post('/register', UserController_1.default.register);
userRouter.get('/user_info', UserAuth_1.default, UserController_1.default.getUserInfo);
userRouter.put('/user_info', UserAuth_1.default, UserController_1.default.updateUserInfo);
userRouter.get('/food', UserController_1.default.getFoods);
userRouter.get('/issue-coupons', UserController_1.default.getIssueCoupon);
userRouter.get('/user-coupons', UserAuth_1.default, UserController_1.default.getUserCoupon);
userRouter.post('/user-coupons', UserAuth_1.default, UserController_1.default.addCoupon);
userRouter.get('/user-payment-pass/exist', UserAuth_1.default, UserController_1.default.isUserPaymentExist);
userRouter.post('/user-payment-pass/validate', UserAuth_1.default, UserController_1.default.validatePaymentPass);
userRouter.put('/user-payment-pass/update', UserAuth_1.default, UserController_1.default.updatePaymentPass);
userRouter.get('/order/type', UserController_1.default.getOrderType);
userRouter.put('/user-wallet', UserAuth_1.default, UserController_1.default.updateUserWallet);
userRouter.get('/order', UserAuth_1.default, UserController_1.default.getOrder);
userRouter.get('/admin-info', UserAuth_1.default, UserController_1.default.getAdminInfo);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map