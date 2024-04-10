"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-03 18:20:36
 * @LastEditTime: 2024-04-07 14:51:14
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\RequestLogMiddleware.ts
 * @Description: 自定义log中间件，将客户端的请求进行上传到aws cloudwatch logs方便运维查看
 */
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var ErrorHandler_1 = require("../exceptions/ErrorHandler");
require('dotenv').config(); //要访问配置信息的地方加上，使其配置信息全局可访问
// 配置 AWS CloudWatch Logs
var cloudwatchlogs = new aws_sdk_1.default.CloudWatchLogs({
    region: process.env.AWS_REGION,
});
// Express 日志中间件定义
var RequestLogMiddleware = function (req, res, next) {
    // 获取请求信息
    var logMessage = "".concat(req.method, " ").concat(req.originalUrl, " - ").concat(res.statusCode);
    console.log('请求log中间件执行', logMessage);
    // 将日志发送到 AWS CloudWatch Logs
    var params = {
        logGroupName: process.env.AWS_logGroupName, // 替换为env的日志组名称
        logStreamName: process.env.AWS_logStreamName, // 替换为env的日志流名称
        logEvents: [
            {
                message: logMessage,
                timestamp: new Date().getTime(),
            },
        ],
    };
    // 发送日志
    cloudwatchlogs.putLogEvents(params, function (err, data) {
        if (err) {
            ErrorHandler_1.errorHandler.handleError(err);
        }
        else {
            console.log('Log sent to CloudWatch successfully:', data);
        }
    });
    //   继续传递请求
    next();
};
exports.default = RequestLogMiddleware;
//# sourceMappingURL=RequestLogMiddleware.js.map