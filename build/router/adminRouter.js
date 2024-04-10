"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-22 10:42:57
 * @LastEditTime: 2024-04-03 10:05:22
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\router\adminRouter.ts
 * @Description: 管理员api路径
 */
var express_1 = __importDefault(require("express"));
var AdminController_1 = __importDefault(require("../controller/AdminController"));
var Auth_1 = __importDefault(require("../filter/Auth"));
var multer_1 = __importDefault(require("multer"));
var ConstantUtil_1 = __importDefault(require("../utils/ConstantUtil"));
require('express-async-errors'); //捕获全局的异步错误
var avatarUpload = (0, multer_1.default)({ dest: ConstantUtil_1.default.uploadAdminProfilePath });
var foodImageUpload = (0, multer_1.default)({ dest: ConstantUtil_1.default.uploadFoodImagePath });
var adminRouter = express_1.default.Router();
adminRouter.post('/login', AdminController_1.default.adminLogin);
adminRouter.get('/admin_info', Auth_1.default, AdminController_1.default.getAdminInfo);
adminRouter.put('/admin_info', Auth_1.default, AdminController_1.default.updateAdminInfo);
adminRouter.post('/pass_validate', Auth_1.default, AdminController_1.default.validatePass);
adminRouter.put('/pass_update', Auth_1.default, AdminController_1.default.updatePass);
adminRouter.put('/avatar_upload', Auth_1.default, avatarUpload.any(), AdminController_1.default.updateAvatar);
adminRouter.post('/coupon', Auth_1.default, AdminController_1.default.issueCoupon);
adminRouter.get('/food', Auth_1.default, AdminController_1.default.getFood);
adminRouter.post('/food', Auth_1.default, foodImageUpload.any(), AdminController_1.default.addFood);
adminRouter.put('/food', Auth_1.default, AdminController_1.default.updateFood);
adminRouter.delete('/food', Auth_1.default, AdminController_1.default.deleteFood);
adminRouter.get('/food_menu', Auth_1.default, AdminController_1.default.getFoodMenu);
adminRouter.post('/food_menu', Auth_1.default, AdminController_1.default.addFoodMenu);
adminRouter.put('/food_menu', Auth_1.default, AdminController_1.default.updateFoodMenuNum);
adminRouter.delete('/food_menu', Auth_1.default, AdminController_1.default.deleteFoodMenu);
adminRouter.get('/outstanding-order', Auth_1.default, AdminController_1.default.getOutstandingOrder);
adminRouter.get('/order_search', Auth_1.default, AdminController_1.default.getOrders);
exports.default = adminRouter;
//# sourceMappingURL=adminRouter.js.map