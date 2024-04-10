"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserServiceImpl_1 = __importDefault(require("../service/impl/UserServiceImpl"));
var LoginEnum_1 = __importDefault(require("../enum/LoginEnum"));
var HttpUtil_1 = __importDefault(require("../utils/HttpUtil"));
var ConstantUtil_1 = __importDefault(require("../utils/ConstantUtil"));
var RegisterEnum_1 = __importDefault(require("../enum/RegisterEnum"));
var FoodMenuServiceImpl_1 = __importDefault(require("../service/impl/FoodMenuServiceImpl"));
var CouponServiceImpl_1 = __importDefault(require("../service/impl/CouponServiceImpl"));
var OrderServiceImpl_1 = __importDefault(require("../service/impl/OrderServiceImpl"));
var AESHelper_1 = __importDefault(require("../utils/AESHelper"));
var UserMessageEnum_1 = __importDefault(require("../enum/UserMessageEnum"));
var AdminServiceImpl_1 = __importDefault(require("../service/impl/AdminServiceImpl"));
var UserController = /** @class */ (function () {
    function UserController() {
        this.userService = new UserServiceImpl_1.default();
        this.couponService = new CouponServiceImpl_1.default();
        this.foodMenuService = new FoodMenuServiceImpl_1.default();
        this.orderService = new OrderServiceImpl_1.default();
        this.adminService = new AdminServiceImpl_1.default();
    }
    UserController.getInstance = function () {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    };
    /**
     * Description 用于用户获取管理员信息
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.getAdminInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, type, adminData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserController.getInstance().adminService.getAdminInfo(ConstantUtil_1.default.adminName)];
                    case 1:
                        admin = _a.sent();
                        type = typeof admin;
                        if (type !== 'string') {
                            adminData = admin;
                            res.send(HttpUtil_1.default.resBody(1, 'success', {
                                admin_id: adminData.get_admin_id(),
                                password: adminData.get_password(),
                                username: adminData.get_username(),
                                phone: adminData.get_phone(),
                                avatar: adminData.get_avatar(),
                                address: adminData.get_address(),
                                shop_name: adminData.get_shop_name(),
                                email: adminData.get_email(),
                            }));
                        }
                        else {
                            res.send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 用户登录（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        return [4 /*yield*/, UserController.getInstance().userService.login(username, password)];
                    case 1:
                        result = _b.sent();
                        switch (result) {
                            case LoginEnum_1.default.serverErr:
                                res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                                break;
                            case LoginEnum_1.default.usernameErr:
                                res.send(HttpUtil_1.default.resBody(0, '用户名错误', ''));
                                break;
                            case LoginEnum_1.default.passwordErr:
                                res.send(HttpUtil_1.default.resBody(0, '密码错误！', ''));
                                break;
                            default:
                                console.log('login生成的token', result);
                                res.send(HttpUtil_1.default.resBody(1, '登录成功！', { token: result }));
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 新用户注册（已测试成功）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, phone, email, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password, phone = _a.phone, email = _a.email;
                        return [4 /*yield*/, UserController.getInstance().userService.register(username, password, email, phone)];
                    case 1:
                        result = _b.sent();
                        switch (result) {
                            case RegisterEnum_1.default.serverErr:
                                res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                                break;
                            case RegisterEnum_1.default.userExist:
                                res.send(HttpUtil_1.default.resBody(0, '用户名已存在，请换一个新的用户名吧！', ''));
                                break;
                            case RegisterEnum_1.default.success:
                                res.send(HttpUtil_1.default.resBody(1, '注册成功', ''));
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 获取用户信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.getUserInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, couponsCount, allOrderNum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.currentId;
                        return [4 /*yield*/, UserController.getInstance().userService.getUserInfo(userId)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, UserController.getInstance().couponService.getAvailableUserCouponsNumber(userId)];
                    case 2:
                        couponsCount = _a.sent();
                        return [4 /*yield*/, UserController.getInstance().orderService.getAllOrderCountNumber(userId)];
                    case 3:
                        allOrderNum = _a.sent();
                        if (user && typeof couponsCount === 'number') {
                            res.send(HttpUtil_1.default.resBody(1, '获取用户信息成功', {
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
                            }));
                        }
                        else {
                            res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新用户信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.updateUserInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, username, phone, address, email, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = req.currentId;
                        _a = req.body, username = _a.username, phone = _a.phone, address = _a.address, email = _a.email;
                        return [4 /*yield*/, UserController.getInstance().userService.updateUserInfo(userId, username, phone, address, email)];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, UserMessageEnum_1.default.successUpdateUserinfo, ''));
                        }
                        else {
                            res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 获取周几的菜单（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.getFoods = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var date, foodMenu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = req.query.date;
                        return [4 /*yield*/, UserController.getInstance().foodMenuService.getFoodMenu(date)];
                    case 1:
                        foodMenu = _a.sent();
                        if (foodMenu) {
                            res.send(HttpUtil_1.default.resBody(1, "".concat(date, "\u7684\u83DC\u5355"), foodMenu));
                        }
                        else {
                            res.send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 找到有效期大于指定日期的优惠券（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.getIssueCoupon = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var date, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = req.query.date;
                        return [4 /*yield*/, UserController.getInstance().couponService.getIssueCoupons(date)];
                    case 1:
                        result = _a.sent();
                        if (result != null && result.length > 0) {
                            res.send(HttpUtil_1.default.resBody(1, "\u8DDD\u79BB\u8FC7\u671F\u5927\u4E8E".concat(date, "\u5929\u7684\u4F18\u60E0\u52B5"), result));
                        }
                        else if (result != null && result.length === 0) {
                            res.send(HttpUtil_1.default.resBody(0, "\u6CA1\u6709\u8DDD\u79BB\u8FC7\u671F\u5927\u4E8E".concat(date, "\u5929\u7684\u4F18\u60E0\u52B5"), ''));
                        }
                        else {
                            res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 查询用户所有可以优惠劵（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.getUserCoupon = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.currentId;
                        return [4 /*yield*/, UserController.getInstance().couponService.getUserCoupons(user_id)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '用户所有可用优惠劵', result));
                        }
                        else {
                            res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 用户登录指定id的优惠券（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.addCoupon = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, coupon_id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.currentId;
                        coupon_id = req.body.coupon_id;
                        console.log('addCoupon参数', user_id, coupon_id);
                        return [4 /*yield*/, UserController.getInstance().couponService.getCoupon(coupon_id, user_id)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '领取优惠劵成功！', ''));
                        }
                        else {
                            res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 确定用户支付密码是否存在(已测试通过)
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.isUserPaymentExist = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.currentId;
                        return [4 /*yield*/, UserController.getInstance().userService.getPaymentPass(user_id)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, UserMessageEnum_1.default.UserPaymentExist, {
                                isExist: result,
                            }));
                        }
                        else {
                            res.send(HttpUtil_1.default.resBody(0, UserMessageEnum_1.default.UserPaymentNotExist, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 检验用户的支付密码是否正确（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.validatePaymentPass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, payment_password, encryptedPassword, regExp, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.currentId;
                        payment_password = req.body.payment_password;
                        encryptedPassword = AESHelper_1.default.decrypt(payment_password);
                        console.log('解密后的支付密码', encryptedPassword);
                        regExp = new RegExp(/^\d{6}$/);
                        console.log('判断结果未取反', regExp.test(encryptedPassword));
                        if (!regExp.test(encryptedPassword)) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .send(HttpUtil_1.default.resBody(0, UserMessageEnum_1.default.UserPaymentNot6, ''))];
                        }
                        return [4 /*yield*/, UserController.getInstance().userService.validatePaymentPass(user_id, payment_password)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, UserMessageEnum_1.default.successPayPassword, ''));
                        }
                        else {
                            res.send(HttpUtil_1.default.resBody(0, UserMessageEnum_1.default.wrongPayPassword, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新支付密码（已通过测试）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.updatePaymentPass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, payment_password, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.currentId;
                        payment_password = req.body.payment_password //加密后的支付密码
                        ;
                        return [4 /*yield*/, UserController.getInstance().userService.updatePaymentPass(user_id, payment_password)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, UserMessageEnum_1.default.successUpdatePayPassword, ''));
                        }
                        else {
                            res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 获取所有的就餐方式选项（已通过测试）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.getOrderType = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orderTypes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserController.getInstance().orderService.getOrderType()];
                    case 1:
                        orderTypes = _a.sent();
                        if (orderTypes) {
                            res.send(HttpUtil_1.default.resBody(1, UserMessageEnum_1.default.allOrderTypes, orderTypes));
                        }
                        else {
                            res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 获取指定用户的全部订单（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.getOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, flag, orders, orderFoods, orderIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.currentId;
                        return [4 /*yield*/, UserController.getInstance().orderService.getUserOrders(user_id)];
                    case 1:
                        orders = _a.sent();
                        orderFoods = [];
                        if (!orders) return [3 /*break*/, 3];
                        orderIds = orders.map(function (order) { return order.order_id; });
                        return [4 /*yield*/, UserController.getInstance().orderService.getUserOrderFoods(orderIds)];
                    case 2:
                        orderFoods =
                            _a.sent();
                        flag = !!orderFoods;
                        return [3 /*break*/, 4];
                    case 3:
                        flag = !!orders;
                        _a.label = 4;
                    case 4:
                        if (flag) {
                            res.send(HttpUtil_1.default.resBody(1, UserMessageEnum_1.default.orderAndFood, {
                                orders: orders,
                                orderFoods: orderFoods,
                            }));
                        }
                        else {
                            res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新用户的钱包余额(已测试通过)
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    UserController.updateUserWallet = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var price, user_id, wallet, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        price = -req.body.price;
                        user_id = req.currentId;
                        return [4 /*yield*/, UserController.getInstance().userService.findUserWallet(user_id)
                            // 如果查询到钱包余额
                        ];
                    case 1:
                        wallet = _a.sent();
                        if (!wallet) return [3 /*break*/, 5];
                        if (!(wallet < Math.abs(price))) return [3 /*break*/, 2];
                        res.send(HttpUtil_1.default.resBody(0, UserMessageEnum_1.default.walletNotEnough, ''));
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, UserController.getInstance().userService.updateUserWallet(user_id, price)];
                    case 3:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, UserMessageEnum_1.default.successPay, ''));
                        }
                        else {
                            res
                                .status(500)
                                .send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=UserController.js.map