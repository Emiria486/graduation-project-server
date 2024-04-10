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
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-21 09:07:13
 * @LastEditTime: 2024-04-01 12:52:12
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\socket\OrderSocket.ts
 * @Description: 实现订单状态实时更改(用户预订socket功能测试通过，管理员实时推送没有测试)
 */
var ws = require('nodejs-websocket');
var OrderServiceImpl_1 = __importDefault(require("../service/impl/OrderServiceImpl"));
var Order_1 = __importDefault(require("../model/Order"));
var CouponServiceImpl_1 = __importDefault(require("../service/impl/CouponServiceImpl"));
var HttpUtil_1 = __importDefault(require("../utils/HttpUtil"));
var UserServiceImpl_1 = __importDefault(require("../service/impl/UserServiceImpl"));
var ConstantUtil_1 = __importDefault(require("../utils/ConstantUtil"));
var AdminServiceImpl_1 = __importDefault(require("../service/impl/AdminServiceImpl"));
var PORT = 9527;
var adminService = new AdminServiceImpl_1.default();
var orderService = new OrderServiceImpl_1.default();
var couponService = new CouponServiceImpl_1.default();
var userService = new UserServiceImpl_1.default();
var orderSocket = function () {
    var server = ws
        .createServer(function (connection) {
        // 解析字符串使用，这里我们使用的json字符串
        connection.on('text', function (JSONData) {
            return __awaiter(this, void 0, void 0, function () {
                var body, admins, adminInfo, orders, userIds, userPromiseArr, users_1, orderIds, foods_1, response_1, foundFoods_1, order, OrderRes, couponRes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('发送的订单信息', JSONData);
                            body = JSON.parse(JSONData);
                            console.log('body', body);
                            return [4 /*yield*/, adminService.findAllAdmin()
                                // 解构取值获得用户名属性值并进行比对
                            ];
                        case 1:
                            admins = _a.sent();
                            adminInfo = admins.find(function (_a) {
                                var username = _a.username;
                                return username === body.username;
                            });
                            if (!(adminInfo !== undefined)) return [3 /*break*/, 7];
                            return [4 /*yield*/, orderService.getOutstandingOrder()];
                        case 2:
                            orders = _a.sent();
                            if (!orders) return [3 /*break*/, 5];
                            userIds = __spreadArray([], __read(new Set(orders.map(function (order) { return order.user_id; }))), false);
                            userPromiseArr = userIds.map(function (item) {
                                return userService.getUserInfo(item);
                            });
                            return [4 /*yield*/, Promise.all(userPromiseArr)];
                        case 3:
                            users_1 = _a.sent();
                            orderIds = orders.map(function (order) { return order.order_id; });
                            return [4 /*yield*/, orderService.getUserOrderFoods(orderIds)];
                        case 4:
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
                                    response_1.push(result);
                                }
                                else {
                                    console.error('未找到匹配的食物信息');
                                }
                            });
                            connection.send(JSON.stringify(HttpUtil_1.default.resBody(1, '所有未完成的订单', response_1)));
                            return [3 /*break*/, 6];
                        case 5:
                            connection.send(JSON.stringify(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, '')));
                            _a.label = 6;
                        case 6: return [3 /*break*/, 11];
                        case 7:
                            order = new Order_1.default(body.user_id, body.user_phone, body.status, body.create_time, body.order_type, body.price, body.discount, body.address);
                            return [4 /*yield*/, orderService.addOrder(order, body.user_id, body.foods)
                                // 优惠券处理
                            ];
                        case 8:
                            OrderRes = _a.sent();
                            if (!(body.coupon_id !== undefined)) return [3 /*break*/, 10];
                            return [4 /*yield*/, couponService.updateUserCouponStatus(0, body.user_id, body.coupon_id)];
                        case 9:
                            couponRes = _a.sent();
                            _a.label = 10;
                        case 10:
                            if (OrderRes) {
                                connection.send(JSON.stringify(HttpUtil_1.default.resBody(1, '预订成功', '')));
                            }
                            else {
                                connection.send(JSON.stringify(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, '')));
                            }
                            _a.label = 11;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        });
        connection.on('connect', function (code) {
            console.log('开启连接', code);
        });
        connection.on('close', function (code) {
            console.log('关闭连接', code);
        });
        connection.on('error', function (code) {
            console.log('异常关闭', code);
        });
        return server;
    })
        .listen(PORT);
};
exports.default = orderSocket;
//# sourceMappingURL=OrderSocket.js.map