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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AdminServiceImpl_1 = __importDefault(require("../service/impl/AdminServiceImpl"));
var CouponServiceImpl_1 = __importDefault(require("../service/impl/CouponServiceImpl"));
var FoodServiceImpl_1 = __importDefault(require("../service/impl/FoodServiceImpl"));
var Admin_1 = __importDefault(require("../model/Admin"));
var Food_1 = __importDefault(require("../model/Food"));
var FoodMenuServiceImpl_1 = __importDefault(require("../service/impl/FoodMenuServiceImpl"));
var OrderServiceImpl_1 = __importDefault(require("../service/impl/OrderServiceImpl"));
var UserServiceImpl_1 = __importDefault(require("../service/impl/UserServiceImpl"));
var HttpUtil_1 = __importDefault(require("../utils/HttpUtil"));
var ConstantUtil_1 = __importDefault(require("../utils/ConstantUtil"));
var LoginEnum_1 = __importDefault(require("../enum/LoginEnum"));
var AdminController = /** @class */ (function () {
    function AdminController() {
        this.adminService = new AdminServiceImpl_1.default();
        this.couponService = new CouponServiceImpl_1.default();
        this.foodService = new FoodServiceImpl_1.default();
        this.foodMenuService = new FoodMenuServiceImpl_1.default();
        this.orderService = new OrderServiceImpl_1.default();
        this.userService = new UserServiceImpl_1.default();
    }
    AdminController.getInstance = function () {
        if (!AdminController.instance) {
            AdminController.instance = new AdminController();
        }
        return AdminController.instance;
    };
    /**
     * Description 用户登录（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.adminLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, username = _a.username, password = _a.password;
                        return [4 /*yield*/, AdminController.getInstance().adminService.login(username, password)];
                    case 1:
                        result = _b.sent();
                        switch (result) {
                            case LoginEnum_1.default.serverErr:
                                res.send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                                break;
                            case LoginEnum_1.default.usernameErr:
                                res.send(HttpUtil_1.default.resBody(0, '用户名不存在！', ''));
                                break;
                            case LoginEnum_1.default.passwordErr:
                                res.send(HttpUtil_1.default.resBody(0, '密码错误！', ''));
                                break;
                            default:
                                res.send(HttpUtil_1.default.resBody(1, '登录成功！', { token: result }));
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 获取管理员用户信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.getAdminInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var username, admin, type, adminData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = req.currentUsername;
                        return [4 /*yield*/, AdminController.getInstance().adminService.getAdminInfo(username)];
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
     * Description 验证密码是否正确，（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.validatePass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var password, username, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = req.body.password;
                        username = req.currentUsername;
                        console.log('validate', password);
                        console.log('username', username);
                        return [4 /*yield*/, AdminController.getInstance().adminService.validatePass(username, password)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '验证密码成功', ''));
                        }
                        else {
                            res.send(HttpUtil_1.default.resBody(0, '密码错误！', ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新管理员头像（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.updateAvatar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var username, _a, destination, path, originalname, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        username = req.currentUsername;
                        _a = req.files[0], destination = _a.destination, path = _a.path;
                        originalname = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8');
                        return [4 /*yield*/, AdminController.getInstance().adminService.updateAdminAvatar(originalname, //用户计算机上的文件的名称
                            destination, //保存路径
                            path, //已上传文件的完整路径
                            username)];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '上传成功！', ''));
                        }
                        else {
                            res.send(HttpUtil_1.default.resBody(0, '上传失败', ''));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新管理员密码（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.updatePass = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = req.currentUsername;
                        password = req.body.password;
                        return [4 /*yield*/, AdminController.getInstance().adminService.updatePass(username, password)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '修改成功！', ''));
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
     * Description 管理员新增优惠券（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.issueCoupon = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, discount, limit, expireIn, create_time, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, discount = _a.discount, limit = _a.limit, expireIn = _a.expireIn, create_time = _a.create_time;
                        return [4 /*yield*/, AdminController.getInstance().couponService.issueCoupon(title, discount, limit, create_time, expireIn)];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '优惠券发行成功！', ''));
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
     * Description 获取所有的菜品信息，（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.getFood = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var foods;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AdminController.getInstance().foodService.getFoodData()];
                    case 1:
                        foods = _a.sent();
                        if (foods) {
                            res.send(HttpUtil_1.default.resBody(1, '获取所有菜品信息成功', foods));
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
     * Description 更新管理员信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.updateAdminInfo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        admin = new Admin_1.default(req.body.password, req.currentUsername, req.body.phone, req.body.avatar, req.body.address, req.body.shop_name, req.body.email);
                        return [4 /*yield*/, AdminController.getInstance().adminService.updateAdminInfo(admin)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '信息修改成功！', ''));
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
     * Description 上传菜品的全部信息，包括图片(已测试通过)
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.addFood = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, food_name, price, status, description, isdelete, _b, destination, path, originalname, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = JSON.parse(req.body.food), food_name = _a.food_name, price = _a.price, status = _a.status, description = _a.description, isdelete = _a.isdelete;
                        console.log('菜品信息', food_name, price, status, description, isdelete);
                        // 获取上传的文件信息
                        console.log('传输的文件', req.files);
                        _b = req.files[0], destination = _b.destination, path = _b.path;
                        originalname = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8');
                        return [4 /*yield*/, AdminController.getInstance().foodService.addFood(food_name, price, status, description, isdelete, destination, path, originalname)];
                    case 1:
                        result = _c.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '菜品添加成功', ''));
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
     * Description 删除指定id的菜品（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.deleteFood = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var food_id, isdelete, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        food_id = req.query.food_id;
                        isdelete = req.query.isdelete;
                        return [4 /*yield*/, AdminController.getInstance().foodService.deleteFood(isdelete, food_id)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '删除菜品成功', ''));
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
     * Description 更新菜品信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.updateFood = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, food_name, price, image, status, description, isdelete, food_id, food, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, food_name = _a.food_name, price = _a.price, image = _a.image, status = _a.status, description = _a.description, isdelete = _a.isdelete, food_id = _a.food_id;
                        food = new Food_1.default(food_name, price, image, status, description, isdelete, food_id);
                        return [4 /*yield*/, AdminController.getInstance().foodService.updateFood(food)];
                    case 1:
                        result = _b.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '更新菜品成功', ''));
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
     * Description 获取周几的菜单详细信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.getFoodMenu = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var date, foodMenu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = req.query.date;
                        return [4 /*yield*/, AdminController.getInstance().foodMenuService.getFoodMenu(date)];
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
     * Description 将菜品数组添加到指定日期的菜单中（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.addFoodMenu = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var number, date, foods_id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        number = req.body.number * 1;
                        date = req.body.date;
                        foods_id = req.body.foods_id;
                        return [4 /*yield*/, AdminController.getInstance().foodMenuService.addFoodMenu(foods_id, number, date)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '添加到菜单成功', ''));
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
     * Description 修改菜单菜品供应数量（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.updateFoodMenuNum = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var food_menu_id, number, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        food_menu_id = req.body.food_menu_id;
                        number = Number(req.body.number);
                        return [4 /*yield*/, AdminController.getInstance().foodMenuService.updateFoodMenuNum(number, food_menu_id)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '修改菜单供应数量成功', ''));
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
     * Description 删除指定id的菜单条目（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.deleteFoodMenu = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var food_menu_id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        food_menu_id = req.query.food_menu_id;
                        return [4 /*yield*/, AdminController.getInstance().foodMenuService.deleteFoodMenu(food_menu_id)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.send(HttpUtil_1.default.resBody(1, '删除指定菜单条目成功', ''));
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
     * Description 获取所有未处理的订单，（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.getOutstandingOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, userIds, userPromiseArr, users_1, orderIds, foods_1, response_1, foundFoods_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, AdminController.getInstance().orderService.getOutstandingOrder()];
                    case 1:
                        orders = _a.sent();
                        if (!orders) return [3 /*break*/, 4];
                        userIds = __spreadArray([], __read(new Set(orders.map(function (order) { return order.user_id; }))), false);
                        userPromiseArr = userIds.map(function (item) {
                            return AdminController.getInstance().userService.getUserInfo(item);
                        });
                        return [4 /*yield*/, Promise.all(userPromiseArr)];
                    case 2:
                        users_1 = _a.sent();
                        console.log('controller的users', users_1);
                        orderIds = orders.map(function (order) { return order.order_id; });
                        console.log('orderIds', orderIds);
                        return [4 /*yield*/, AdminController.getInstance().orderService.getUserOrderFoods(orderIds)];
                    case 3:
                        foods_1 = _a.sent();
                        response_1 = [];
                        orders.forEach(function (order) {
                            foundFoods_1 = foods_1 === null || foods_1 === void 0 ? void 0 : foods_1.filter(function (foodItem) { return foodItem.order_id === order.order_id; });
                            if (foundFoods_1 && foundFoods_1.length > 0) {
                                var result = {
                                    foods: foundFoods_1.map(function (food) { return food.food; }),
                                    userInfo: users_1.find(function (user) { return user.user_id === order.user_id; }),
                                    userOrder: order,
                                };
                                console.log('controller的orders', result);
                                response_1.push(result);
                            }
                            else {
                                console.error('未找到匹配的食物信息');
                            }
                        });
                        console.log('发送的响应', response_1);
                        res.send(HttpUtil_1.default.resBody(1, '所有未完成的订单', response_1));
                        return [3 /*break*/, 5];
                    case 4:
                        res.send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 分页查询订单（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    AdminController.getOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pageStart, pageSize, startTime, endTime, orders, userIds, users, filteredOrders, orderIds, orderFoods, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageStart = parseInt(req.query.pageStart);
                        pageSize = parseInt(req.query.pageSize);
                        startTime = req.query.startTime;
                        endTime = req.query.endTime;
                        return [4 /*yield*/, AdminController.getInstance().orderService.getOrdersByPaginationAndDate(pageStart, pageSize, startTime, endTime)];
                    case 1:
                        orders = _a.sent();
                        userIds = __spreadArray([], __read(new Set(orders.map(function (order) { return order.user_id; }))), false);
                        return [4 /*yield*/, Promise.all(userIds.map(function (id) {
                                return AdminController.getInstance().userService.getUserInfo(id);
                            }))];
                    case 2:
                        users = _a.sent();
                        filteredOrders = orders.filter(function (order) { return order !== undefined && order.order_id !== undefined; });
                        orderIds = filteredOrders.map(function (order) { return order.order_id; });
                        return [4 /*yield*/, AdminController.getInstance().orderService.getUserOrderFoods(orderIds)];
                    case 3:
                        orderFoods = _a.sent();
                        return [4 /*yield*/, AdminController.getInstance().orderService.getOrdersCount(startTime, endTime)];
                    case 4:
                        count = _a.sent();
                        if (orders) {
                            res.send(HttpUtil_1.default.resBody(1, '已获得分页订单数据', {
                                orders: orders,
                                users: users,
                                orderFoods: orderFoods,
                                count: count,
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
    return AdminController;
}());
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map