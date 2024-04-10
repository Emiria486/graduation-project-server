"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-03 18:42:39
 * @LastEditTime: 2024-04-03 19:56:10
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\ErrorLogMiddleware.ts
 * @Description: 错误信息的log上传
 */
var aws_sdk_1 = __importDefault(require("aws-sdk"));
require('dotenv').config(); //要访问配置信息的地方加上，使其配置信息全局可访问
var HttpUtil_1 = __importDefault(require("./HttpUtil"));
var ConstantUtil_1 = __importDefault(require("./ConstantUtil"));
// 配置 AWS CloudWatch Logs
var cloudwatchlogs = new aws_sdk_1.default.CloudWatchLogs({
    region: process.env.AWS_REGION,
});
var ErrorLogMiddleware = function (err, req, res, next) {
    // 获取请求信息
    var errMessage = "Error:".concat(err.stack);
    console.log('错误中间件执行', errMessage);
    var params = {
        logGroupName: process.env.AWS_logGroupName, // 替换为env的日志组名称
        logStreamName: process.env.AWS_logStreamName, // 替换为env的日志流名称
        logEvents: [
            {
                message: errMessage,
                timestamp: new Date().getTime(), // 时间戳
            },
        ],
    };
    // 发送日志事件到CloudWatch Logs
    cloudwatchlogs.putLogEvents(params, function (err, data) {
        if (err) {
            console.error('Error sending log event:', err);
        }
        else {
            console.log('Log event sent successfully:', data);
        }
    });
    res.status(500).send(HttpUtil_1.default.resBody(0, ConstantUtil_1.default.serverErrMsg, ''));
    //   继续传递请求
    next();
};
exports.default = ErrorLogMiddleware;
//# sourceMappingURL=ErrorLogMiddleware.js.map