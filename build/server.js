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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 10:34:04
 * @LastEditTime: 2024-04-18 23:00:13
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\server.ts
 * @Description: 服务器入口文件
 */
var express_1 = __importDefault(require("express"));
require('dotenv').config(); //要访问配置信息的地方加上，使其配置信息全局可访问
var cors_1 = __importDefault(require("cors"));
var bodyParser = __importStar(require("body-parser"));
var path_1 = __importDefault(require("path"));
var userRouter_1 = __importDefault(require("./router/userRouter"));
var adminRouter_1 = __importDefault(require("./router/adminRouter"));
var ConstantUtil_1 = __importDefault(require("./utils/ConstantUtil"));
var OrderSocket_1 = __importDefault(require("./socket/OrderSocket"));
require("./process"); //处理未捕获异常
var ErrorHandler_1 = require("./exceptions/ErrorHandler");
var RequestLogMiddleware_1 = __importDefault(require("./utils/RequestLogMiddleware"));
var ErrorLogMiddleware_1 = __importDefault(require("./utils/ErrorLogMiddleware"));
var app = (0, express_1.default)();
//引入cors，解决跨域问题
app.use((0, cors_1.default)());
//启动websocket服务
(0, OrderSocket_1.default)();
//开放静态资源
app.use('/static/', express_1.default.static(path_1.default.join(__dirname, './upload/')));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
// 统一处理异常
userRouter_1.default.use(function (err, req, res, next) {
    next(err);
    ErrorHandler_1.errorHandler.handleError(err);
});
adminRouter_1.default.use(function (err, req, res, next) {
    next(err);
    ErrorHandler_1.errorHandler.handleError(err);
});
// 运用上传请求log中间件
app.use(RequestLogMiddleware_1.default);
// 运用上传异常log中间件
app.use('/app', userRouter_1.default).use('/lyj', adminRouter_1.default);
app.use(ErrorLogMiddleware_1.default);
app.listen(ConstantUtil_1.default.port, function () {
    return console.log("http server running in http://localhost:".concat(ConstantUtil_1.default.port));
});
//# sourceMappingURL=server.js.map