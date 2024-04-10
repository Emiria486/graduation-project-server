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
var FoodMenuDaoImpl_1 = __importDefault(require("../../dao/impl/FoodMenuDaoImpl"));
var FoodDaoImpl_1 = __importDefault(require("../../dao/impl/FoodDaoImpl"));
var FoodMenuServiceImpl = /** @class */ (function () {
    function FoodMenuServiceImpl() {
        this.foodMenuDao = new FoodMenuDaoImpl_1.default();
        this.foodDao = new FoodDaoImpl_1.default();
    }
    /**
     * Description 添加菜品到菜单
     * @param {any} foods_id:number[] 菜品id数组
     * @param {any} number:number 菜品数量
     * @param {any} date:string  菜单所属周几
     * @returns {any} 是否添加成功
     */
    FoodMenuServiceImpl.prototype.addFoodMenu = function (foods_id, number, date) {
        return __awaiter(this, void 0, void 0, function () {
            var ids;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ids = foods_id.map(function (food_id) {
                            return _this.foodMenuDao.addFoodMenu(food_id, number, date);
                        });
                        return [4 /*yield*/, Promise.all(ids).catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 删除指定id的菜单记录
     * @param {any} food_menu_id:number 指定菜单id
     * @returns {any} 是否删除
     */
    FoodMenuServiceImpl.prototype.deleteFoodMenu = function (food_menu_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.foodMenuDao
                            .deleteFoodMenuById(food_menu_id)
                            .catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 更新指定菜单中的菜品供应数量
     * @param {any} number:number 菜品数量
     * @param {any} food_menu_id:number 菜单id
     * @returns {any} 是否更新成功
     */
    FoodMenuServiceImpl.prototype.updateFoodMenuNum = function (number, food_menu_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.foodMenuDao
                            .updateFoodMenuNumByFoodMenuId(number, food_menu_id)
                            .catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 找到指定周几的菜单所属的全部菜品数组
     * @param {any} date:string 指定周几
     * @returns {any} food[]：菜品数组或Boolean：查询失败
     */
    FoodMenuServiceImpl.prototype.getFoodMenu = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, foodMenu, promiseArr, foods_1, result, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ids = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.foodMenuDao.queryByDate(date)];
                    case 2:
                        foodMenu = _a.sent();
                        foodMenu.forEach(function (food) {
                            ids.push(food.food_id);
                        });
                        // 去重,减少查询数据库次数
                        ids = __spreadArray([], __read(new Set(ids)), false);
                        promiseArr = ids.map(function (id) { return _this.foodDao.findById(id); });
                        return [4 /*yield*/, Promise.all(promiseArr)];
                    case 3:
                        foods_1 = _a.sent();
                        result = foodMenu.map(function (item) {
                            var foodFound = foods_1.find(function (food) { return food.food_id === item.food_id && food.isdelete === 0; });
                            if (foodFound) {
                                return Object.assign(item, foodFound);
                            }
                        });
                        result = result.filter(function (item) { return item !== undefined; });
                        return [2 /*return*/, result];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return FoodMenuServiceImpl;
}());
exports.default = FoodMenuServiceImpl;
//# sourceMappingURL=FoodMenuServiceImpl.js.map