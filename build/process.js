"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-03 10:23:56
 * @LastEditTime: 2024-04-03 11:58:36
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\process.ts
 * @Description: 注册全局的处理函数来捕获异常
 */
var ErrorHandler_1 = require("./exceptions/ErrorHandler");
process.on('unhandledRejection', function (reason) {
    var _a;
    console.log('on unhandledRejection: ', reason);
    ErrorHandler_1.errorHandler.handleError(new Error((_a = reason === null || reason === void 0 ? void 0 : reason.message) !== null && _a !== void 0 ? _a : reason));
});
process.on('uncaughtException', function (error) {
    console.log('on uncaughtException: ', error);
    ErrorHandler_1.errorHandler.handleError(error);
});
//# sourceMappingURL=process.js.map