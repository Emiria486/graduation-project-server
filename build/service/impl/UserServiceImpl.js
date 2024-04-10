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
var LoginEnum_1 = __importDefault(require("../../enum/LoginEnum"));
var UserDaoImpl_1 = __importDefault(require("../../dao/impl/UserDaoImpl"));
var JWTUtil_1 = __importDefault(require("../../utils/JWTUtil"));
var RegisterEnum_1 = __importDefault(require("../../enum/RegisterEnum"));
var AESHelper_1 = __importDefault(require("../../utils/AESHelper"));
var UserServiceImpl = /** @class */ (function () {
    function UserServiceImpl() {
        this.UserDao = new UserDaoImpl_1.default();
    }
    /**
     * Description 登录函数 (已测试通过)
     * @param {any} username:string 用户名
     * @param {any} password:string 用户密码
     * @returns {any} LoginEnum：提示字符串 | string token
     */
    UserServiceImpl.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.UserDao.findByUserName(username)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, LoginEnum_1.default.usernameErr];
                        }
                        else if (AESHelper_1.default.decrypt(user.password) !== AESHelper_1.default.decrypt(password)) {
                            console.log('user.password', user.password);
                            console.log('password参数', password);
                            return [2 /*return*/, LoginEnum_1.default.passwordErr];
                        }
                        else {
                            return [2 /*return*/, JWTUtil_1.default.generate({
                                    username: user.username,
                                    userId: user.user_id,
                                })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, LoginEnum_1.default.serverErr];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description
     * @param {any} username:string 用户名
     * @param {any} password:string 注册密码
     * @param {any} email:string    邮箱
     * @param {any} phone:string  手机号
     * @returns {any} RegisterEnum：登录提示字符串
     */
    UserServiceImpl.prototype.register = function (username, password, email, phone) {
        return __awaiter(this, void 0, void 0, function () {
            var user, addResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.UserDao.findByUserName(username)];
                    case 1:
                        user = _a.sent();
                        if (!(user !== undefined)) return [3 /*break*/, 2];
                        return [2 /*return*/, RegisterEnum_1.default.userExist];
                    case 2: return [4 /*yield*/, this.UserDao.insertOnce(username, AESHelper_1.default.decrypt(password), email, phone)];
                    case 3:
                        addResult = _a.sent();
                        if (addResult)
                            return [2 /*return*/, RegisterEnum_1.default.success];
                        else
                            return [2 /*return*/, RegisterEnum_1.default.serverErr];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, RegisterEnum_1.default.serverErr];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新指定id的用户信息
     * @param {any} userId:number 用户id
     * @param {any} username:string 用户名
     * @param {any} phone:string 手机号
     * @param {any} address:string 地址
     * @param {any} email:string 邮箱
     * @returns {any} 是否更新成功
     */
    UserServiceImpl.prototype.updateUserInfo = function (userId, username, phone, address, email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UserDao.updateInfoByUserId(userId, username, phone, address, email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 获取指定id的用户信息
     * @param {any} userId:number 指定id
     * @returns {any} User：用户信息 null：查询为空
     */
    UserServiceImpl.prototype.getUserInfo = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.UserDao.findByUserId(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
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
     * Description 获得指定id的支付密码
     * @param {any} userId:number 指定id
     * @returns {any} 加密后的支付密码字符串
     */
    UserServiceImpl.prototype.getPaymentPass = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.UserDao.findPaymentPassByUserId(userId)];
                    case 1:
                        result = _a.sent();
                        if (result.length === 0) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, result];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新指定id的用户支付密码
     * @param {any} userId:number 指定id
     * @param {any} payment_password:string 客户端加密后的支付密码
     * @returns {any} 是否更新成功
     */
    UserServiceImpl.prototype.updatePaymentPass = function (userId, payment_password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UserDao.updatePaymentPass(userId, AESHelper_1.default.decrypt(payment_password)).catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 校验支付密码是否正确
     * @param {any} userId:number 用户id
     * @param {any} payment_password:string 客户端加密后的支付密码
     * @returns {any}
     */
    UserServiceImpl.prototype.validatePaymentPass = function (userId, payment_password) {
        return __awaiter(this, void 0, void 0, function () {
            var DBPassword, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.UserDao.findPaymentPassByUserId(userId)];
                    case 1:
                        DBPassword = _a.sent();
                        return [2 /*return*/, (AESHelper_1.default.decrypt(DBPassword) === AESHelper_1.default.decrypt(payment_password))];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新用户钱包余额
     * @param {any} userId:number 指定id
     * @param {any} price:number 扣除金额
     * @returns {any} 是否更新成功
     */
    UserServiceImpl.prototype.updateUserWallet = function (userId, price) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UserDao.updateWalletById(userId, price).catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 找到指定id的用户钱包余额
     * @param {any} userId:number 指定id
     * @returns {any} 钱包余额或查询失败
     */
    UserServiceImpl.prototype.findUserWallet = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UserDao.findWalletById(userId).catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserServiceImpl;
}());
exports.default = UserServiceImpl;
//# sourceMappingURL=UserServiceImpl.js.map