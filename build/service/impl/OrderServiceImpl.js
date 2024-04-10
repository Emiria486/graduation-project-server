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
var OrderDaoImpl_1 = __importDefault(require("../../dao/impl/OrderDaoImpl"));
var OrderFood_1 = __importDefault(require("../../model/OrderFood"));
var OrderServiceImpl = /** @class */ (function () {
    function OrderServiceImpl() {
        this.orderDao = new OrderDaoImpl_1.default();
    }
    OrderServiceImpl.prototype.getAllOrderCountNumber = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var allOrderNumber, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.orderDao.getAllOrderCount(user_id)];
                    case 1:
                        allOrderNumber = _a.sent();
                        return [2 /*return*/, allOrderNumber];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 向order表和orderFood表先后插入订单数据
     * @param {any} order:Order 订单信息
     * @param {any} user_id:number 用户id
     * @param {any} orderFoods:OrderFood[] 用户下单菜品信息
     * @returns {any}
     */
    OrderServiceImpl.prototype.addOrder = function (order, user_id, orderFoods) {
        return __awaiter(this, void 0, void 0, function () {
            var addOrderResult, orderIDObject, orderID_1, FullOrderFoods_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.orderDao.insertOnce(order)
                            // 插入成功后找到插入的记录信息
                        ];
                    case 1:
                        addOrderResult = _a.sent();
                        if (!addOrderResult) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.orderDao.queryOrderIdByUserIdAndCreate_time(user_id, order.create_time)
                            // 获得订单编号
                        ];
                    case 2:
                        orderIDObject = _a.sent();
                        orderID_1 = orderIDObject.order_id;
                        FullOrderFoods_1 = [];
                        orderFoods.forEach(function (orderFood) {
                            var itemFood = new OrderFood_1.default(orderFood.food_id2, orderFood.number, orderID_1);
                            FullOrderFoods_1.push(itemFood);
                        });
                        console.log("插入的orderFoods", FullOrderFoods_1);
                        return [4 /*yield*/, this.orderDao.insertOrderFood(FullOrderFoods_1)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, false]; // 处理无法成功插入订单的情况
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, false]; // 处理异常情况
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 找到所有的订单种类（堂食，外卖，打包）
     * @returns {any} orderType[]
     */
    OrderServiceImpl.prototype.getOrderType = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDao.queryAllOrderType()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 获取指定用户的所有订单
     * @param {any} user_id:number
     * @returns {any}
     */
    OrderServiceImpl.prototype.getUserOrders = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDao.queryOrderByUserId(user_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 找到指定订单id对应的下单菜品数量，订单号和下单菜品的全部信息的对象数组
     * @param {any} order_id:number
     * @returns {any} 下单菜品数量，订单号和下单菜品的全部信息的对象数组
     */
    OrderServiceImpl.prototype.getUserOrderFoods = function (order_ids) {
        return __awaiter(this, void 0, void 0, function () {
            var promiseArray, foods, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        promiseArray = order_ids.map(function (orderId) {
                            return _this.orderDao.findOrderFoodByOrderId(orderId);
                        });
                        return [4 /*yield*/, Promise.all(promiseArray)
                            // 过滤空数组
                        ];
                    case 1:
                        foods = _a.sent();
                        // 过滤空数组
                        foods = foods.filter(function (item) {
                            return Array.isArray(item) ? item.length > 0 : true;
                        });
                        foods = foods.reduce(function (acc, val) { return acc.concat(val); }, []);
                        console.log('service的foods', foods);
                        //处理格式
                        foods = foods.map(function (item, index) { return ({
                            order_id: item.order_id,
                            food: {
                                number: item.number,
                                food_id: item.food_id,
                                food_name: item.food_name,
                                price: item.price,
                                image: item.image,
                                status: item.status,
                                description: item.description,
                            },
                        }); });
                        console.log('service的foods finally', foods);
                        return [2 /*return*/, foods];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 找到指定用户最新时间的一个订单
     * @param {any} user_Id:number
     * @returns {any}
     */
    OrderServiceImpl.prototype.getUserNewOrder = function (user_Id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDao.findNewOrderByUserId(user_Id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 根据指定订单号找到orderFood
     * @param {any} order_Id:number
     * @returns {any} 包含下单菜品数量，订单号和下单菜品的全部信息的对象数组
     */
    OrderServiceImpl.prototype.getUserNewOrderFoods = function (order_Id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDao.findOrderFoodByOrderId(order_Id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 查找所有未处理的订单：status为0
     * @returns {any}
     */
    OrderServiceImpl.prototype.getOutstandingOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDao.queryOutstandingOrder()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrderServiceImpl.prototype.getOrdersByPaginationAndDate = function (pageStart, pageSize, startTime, endTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageStart = (pageStart - 1) * pageSize;
                        return [4 /*yield*/, this.orderDao.queryByPageAndDate(pageStart, pageSize, startTime, endTime)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 统计指定时间段的订单总数
     * @param {any} startTime:string 开始时间
     * @param {any} endTime:string    截至时间
     * @returns {any}
     */
    OrderServiceImpl.prototype.getOrdersCount = function (startTime, endTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderDao
                            .queryCountByDate(startTime, endTime)
                            .catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return OrderServiceImpl;
}());
exports.default = OrderServiceImpl;
//# sourceMappingURL=OrderServiceImpl.js.map