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
var Coupon_1 = __importDefault(require("../../model/Coupon"));
var CouponDaoImpl_1 = __importDefault(require("../../dao/impl/CouponDaoImpl"));
var CouponServiceImpl = /** @class */ (function () {
    function CouponServiceImpl() {
        this.couponDao = new CouponDaoImpl_1.default();
    }
    /**
     * Description 向优惠劵库添加新的优惠劵信息
     * @param {any} title:string 优惠劵标题
     * @param {any} discount:number 减免金额
     * @param {any} limit:number  使用限制金额
     * @param {any} create_time:string 生成时间
     * @param {any} expireIn:number 过期时间
     * @returns {any} 是否添加成功的boolean
     */
    CouponServiceImpl.prototype.issueCoupon = function (title, discount, limit, create_time, expireIn) {
        return __awaiter(this, void 0, void 0, function () {
            var coupon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coupon = new Coupon_1.default(title, discount, limit, create_time, expireIn);
                        return [4 /*yield*/, this.couponDao.addCoupon(coupon).catch(function (e) {
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 找到距离过期大于指定日数的优惠劵
     * @param {any} date:number 指定日数
     * @returns {any} 优惠劵数组或空
     */
    CouponServiceImpl.prototype.getIssueCoupons = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.couponDao.findByDate(date).catch(function () { return null; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 给指定用户添加指定优惠劵
     * @param {any} coupon_id:number 优惠劵id
     * @param {any} user_id:number 用户id
     * @returns {any} Boolean：是否添加成功
     */
    CouponServiceImpl.prototype.getCoupon = function (coupon_id, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.couponDao
                            .addCouponToUser(coupon_id, user_id)
                            .catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 找到指定用户的所有可用优惠劵
     * @param {any} user_id:number 用户id
     * @returns {any}优惠劵数组或空
     */
    CouponServiceImpl.prototype.getUserCoupons = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var UserCoupons, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.couponDao.findUserCoupons(user_id)];
                    case 1:
                        UserCoupons = _a.sent();
                        return [2 /*return*/, UserCoupons];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 返回指定用户的全部可用优惠劵的总数
     * @param {any} user_id:number
     * @returns {any} number：总数或Boolean：失败
     */
    CouponServiceImpl.prototype.getAvailableUserCouponsNumber = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.couponDao
                            .findAvailableCountByUserId(user_id)
                            .catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 更新用户持有的优惠劵的状态
     * @param {any} status:number 优惠劵可用状态，1为可用，0为不可用
     * @param {any} user_id:number 用户id
     * @param {any} coupon_id:number 优惠劵id
     * @returns {any} 是否更新成功
     */
    CouponServiceImpl.prototype.updateUserCouponStatus = function (status, user_id, coupon_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.couponDao
                        .updateStatusById(status, user_id, coupon_id)
                        .catch(function (e) { return false; })];
            });
        });
    };
    return CouponServiceImpl;
}());
exports.default = CouponServiceImpl;
//# sourceMappingURL=CouponServiceImpl.js.map