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
var Food_1 = __importDefault(require("../../model/Food"));
var FoodDaoImpl_1 = __importDefault(require("../../dao/impl/FoodDaoImpl"));
var fs = __importStar(require("node:fs"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
require('dotenv').config(); //要访问配置信息的地方加上，使其配置信息全局可访问
var FoodServiceImpl = /** @class */ (function () {
    function FoodServiceImpl() {
        this.foodDao = new FoodDaoImpl_1.default();
    }
    /**
     * Description 向food表添加新菜品
     * @param {any} food_name:string 菜品名称
     * @param {any} price:number  菜品单价
     * @param {any} status:boolean 是否销售
     * @param {any} description:string 菜品描述
     * @param {any} destination:string
     * @param {any} path:string
     * @param {any} filename:string 文件名
     * @returns {any} 是否添加成功
     */
    FoodServiceImpl.prototype.addFood = function (food_name, price, status, description, isdelete, destination, path, filename) {
        return __awaiter(this, void 0, void 0, function () {
            var oldPath, newPath, awsImage, awsConfig, s3_1, uploadToS3, uploadUrl, food, updated, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldPath = path;
                        newPath = "".concat(destination, "/").concat(filename);
                        awsImage = '';
                        if (!fs.existsSync(oldPath)) return [3 /*break*/, 6];
                        fs.renameSync(oldPath, newPath);
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
                                    Key: filename, // 上传后的文件名
                                    Body: fs.readFileSync(newPath),
                                    ACL: 'public-read', // 设置上传后的文件为公共读取权限
                                };
                                s3_1.upload(uploadParams, function (err, data) {
                                    if (err) {
                                        console.log('Error:', err);
                                        reject(err);
                                    }
                                    else {
                                        awsImage = data.Location; //获得图片链接对象
                                        console.log('Image uploaded successfully. URL:', data.Location);
                                        resolve(awsImage);
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
                        food = new Food_1.default(food_name, price, uploadUrl, status, description, isdelete);
                        return [4 /*yield*/, this.foodDao.addFood(food)
                            // 上传完以后删除本地文件
                        ];
                    case 3:
                        updated = _a.sent();
                        // 上传完以后删除本地文件
                        fs.unlinkSync(newPath);
                        console.log('成功删除本地文件');
                        return [2 /*return*/, updated];
                    case 4:
                        error_1 = _a.sent();
                        console.error('上传S3失败或上传数据库失败', error_1);
                        return [2 /*return*/, false];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Description 更新菜品信息
     * @param {any} food:Food 更新后的菜品信息类
     * @returns {any} 是否修改成功
     */
    FoodServiceImpl.prototype.updateFood = function (food) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.foodDao.updateFood(food).catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Description 获取所有菜品信息
     * @returns {any}  Food[]：菜品数组或Boolean查询失败
     */
    FoodServiceImpl.prototype.getFoodData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.foodDao.queryAll().catch(function () { return false; })];
            });
        });
    };
    /**
     * Description 删除指定id的菜品
     * @param {any} food_id:number 菜品id
     * @returns {any} 是否删除
     */
    FoodServiceImpl.prototype.deleteFood = function (isdelete, food_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.foodDao.deleteById(isdelete, food_id).catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return FoodServiceImpl;
}());
exports.default = FoodServiceImpl;
//# sourceMappingURL=FoodServiceImpl.js.map