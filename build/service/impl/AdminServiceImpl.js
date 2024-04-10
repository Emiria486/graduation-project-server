"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var AdminDaoImpl_1 = __importDefault(require("../../dao/impl/AdminDaoImpl"));
var LoginEnum_1 = __importDefault(require("../../enum/LoginEnum"));
var JWTUtil_1 = __importDefault(require("../../utils/JWTUtil"));
var fs = __importStar(require("node:fs"));
var ConstantUtil_1 = __importDefault(require("../../utils/ConstantUtil"));
var FoodDaoImpl_1 = __importDefault(require("../../dao/impl/FoodDaoImpl"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var AESHelper_1 = __importDefault(require("../../utils/AESHelper"));
require('dotenv').config(); //要访问配置信息的地方加上，使其配置信息全局可访问
var AdminServiceImpl = /** @class */ (function () {
    function AdminServiceImpl() {
        this.foodDao = new FoodDaoImpl_1.default();
        this.adminDao = new AdminDaoImpl_1.default();
    }
    AdminServiceImpl.prototype.findAllAdmin = function () {
        var admins = this.adminDao.queryAllAdmin();
        console.log('findAllAdmin', admins);
        return admins;
    };
    /**
     * Description 管理员登录
     * @param {any} username:string 用户名登录
     * @param {any} password:string 客户端使用AES加密后的密码字符串
     * @returns {string} 生成token字符串
     */
    AdminServiceImpl.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminDao.findByUsername(username)];
                    case 1:
                        admin = _a.sent();
                        if (!admin) {
                            // admin为空，用户名登录失败
                            return [2 /*return*/, LoginEnum_1.default.usernameErr];
                        }
                        //   取出的加密后的密码与在客户端加密后的密码不对，密码登录失败
                        else if (AESHelper_1.default.decrypt(admin.password) !== AESHelper_1.default.decrypt(password)) {
                            return [2 /*return*/, LoginEnum_1.default.passwordErr];
                        }
                        else {
                            // 登录成功，生成token
                            return [2 /*return*/, JWTUtil_1.default.generate({
                                    username: admin.username,
                                    adminId: admin.admin_id,
                                })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, LoginEnum_1.default.serverErr];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 根据指定用户名得到管理员信息
     * @param {any} username:string 指定用户名
     * @returns {admin} 管理员信息或错误提示字符串
     */
    AdminServiceImpl.prototype.getAdminInfo = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminDao.findByUsername(username)
                            //   检查头像字符串是否为空
                        ];
                    case 1:
                        admin = _b.sent();
                        //   检查头像字符串是否为空
                        if (((_a = admin.avatar) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                            return [2 /*return*/, admin];
                        }
                        else {
                            //如果头像为空，返回默认头像
                            admin.set_avatar(ConstantUtil_1.default.adminDefaultAvatar);
                            return [2 /*return*/, admin];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, LoginEnum_1.default.serverErr];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新管理员信息
     * @param {any} admin:Admin 更新后的管理员对象
     * @returns {any} Boolean的promise
     */
    AdminServiceImpl.prototype.updateAdminInfo = function (admin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminDao.updateInfoByUsername(admin).catch(function (e) { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 更新管理员头像（已测试通过）
     * @param {any} originalname:string  文件名
     * @param {any} destination:string 存储路径
     * @param {any} path:string 原来的图片路径
     * @param {any} username:string 管理员用户名
     * @returns {any} boolean
     */
    AdminServiceImpl.prototype.updateAdminAvatar = function (originalname, destination, path, username) {
        return __awaiter(this, void 0, void 0, function () {
            var oldPath, newPath, uploadPath, awsConfig, s3_1, uploadToS3, uploadUrl, updated, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldPath = path;
                        newPath = "".concat(destination, "/").concat(originalname);
                        uploadPath = '' //S3上的对象链接
                        ;
                        if (!fs.existsSync(oldPath)) return [3 /*break*/, 6];
                        fs.renameSync(oldPath, newPath); //注意：如果与newPath同名文件存在，直接覆盖,异步
                        awsConfig = {
                            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                            region: process.env.AWS_REGION,
                        };
                        aws_sdk_1.default.config.update(awsConfig);
                        s3_1 = new aws_sdk_1.default.S3();
                        uploadToS3 = function () {
                            return new Promise(function (resolve, reject) {
                                var uploadParams = {
                                    Bucket: process.env.AWS_BUCKET_NAME,
                                    Key: originalname, // 上传后的文件名
                                    Body: fs.readFileSync(newPath),
                                    ACL: 'public-read', // 设置上传后的文件为公共读取权限
                                };
                                s3_1.upload(uploadParams, function (err, data) {
                                    if (err) {
                                        console.log('Error:', err);
                                        reject(err);
                                    }
                                    else {
                                        uploadPath = data.Location;
                                        console.log('Image uploaded successfully. URL:', data.Location);
                                        console.log('uploadPath', uploadPath);
                                        resolve(data.Location);
                                    }
                                });
                            });
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, uploadToS3()];
                    case 2:
                        uploadUrl = _a.sent();
                        return [4 /*yield*/, this.adminDao.updateAvatarByUsername(username, uploadUrl)
                            // 上传完以后删除本地文件
                        ];
                    case 3:
                        updated = _a.sent();
                        // 上传完以后删除本地文件
                        fs.unlinkSync(newPath);
                        console.log('Local file deleted successfully.');
                        return [2 /*return*/, updated];
                    case 4:
                        error_2 = _a.sent();
                        console.error('Error uploading to S3 or updating database:', error_2);
                        return [2 /*return*/, false];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 校验用户输入的密码是否正确
     * @param {any} username:string 输入的用户名
     * @param {any} password:string 输入的客户端加密后的用户密码
     * @returns {any} Boolean的promise
     */
    AdminServiceImpl.prototype.validatePass = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adminDao.findByUsername(username)
                            //   比较数据库中的加密密码与加密后的输入的用户密码是否相同
                        ];
                    case 1:
                        admin = _a.sent();
                        result = AESHelper_1.default.decrypt(admin.password) === AESHelper_1.default.decrypt(password);
                        console.log('service', result);
                        return [2 /*return*/, result];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新管理员登录密码
     * @param {any} username:string 用户名
     * @param {any} password:string 客户端加密后的密码字符串
     * @returns {any}
     */
    AdminServiceImpl.prototype.updatePass = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminDao.updatePassByUsername(username, AESHelper_1.default.decrypt(password))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 管理员添加新菜品（不可用，应该使用FoodService的addFood!!!）
     * @param {any} food:Food
     * @returns {any}
     */
    AdminServiceImpl.prototype.addNewFood = function (food) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.foodDao.addFood(food)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 测试AWS环境变量
     * @returns {any}
     */
    AdminServiceImpl.prototype.envTest = function () {
        console.log(process.env.AWS_ACCESS_KEY_ID);
        console.log(process.env.AWS_SECRET_ACCESS_KEY);
        console.log(process.env.AWS_BUCKET_NAME);
        console.log(process.env.AWS_REGION);
    };
    return AdminServiceImpl;
}());
exports.default = AdminServiceImpl;
//# sourceMappingURL=AdminServiceImpl.js.map