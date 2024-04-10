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
exports.receiveMessageFromQueue = exports.sendMessageToQueue = void 0;
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-06 17:58:50
 * @LastEditTime: 2024-04-06 18:23:24
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\SQSUtil.ts
 * @Description: sqs队列的入队列和接收队列的函数
 */
var aws_sdk_1 = __importDefault(require("aws-sdk"));
require('dotenv').config(); //要访问配置信息的地方加上，使其配置信息全局可访问
var ErrorHandler_1 = require("../exceptions/ErrorHandler");
var sqs = new aws_sdk_1.default.SQS({ region: process.env.AWS_REGION }); // 根据您的地区配置
// 发送消息到sqs队列
var sendMessageToQueue = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var params, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    MessageBody: JSON.stringify(message),
                    QueueUrl: process.env.AWS_SQSURL,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, sqs.sendMessage(params).promise()];
            case 2:
                _a.sent();
                console.log('Message sent to SQS queue.');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                ErrorHandler_1.errorHandler.handleError(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendMessageToQueue = sendMessageToQueue;
// 从SQS队列接收消息
var receiveMessageFromQueue = function () { return __awaiter(void 0, void 0, void 0, function () {
    var params, data, message, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    QueueUrl: process.env.AWS_SQSURL, // 替换成您的SQS队列URL
                    MaxNumberOfMessages: 1,
                    WaitTimeSeconds: 10,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, sqs.receiveMessage(params).promise()];
            case 2:
                data = _a.sent();
                if (!data.Messages) return [3 /*break*/, 4];
                message = data.Messages[0];
                console.log('Received message from SQS:', message.Body);
                // 处理消息逻辑...
                // 删除已处理的消息
                return [4 /*yield*/, sqs
                        .deleteMessage({
                        QueueUrl: process.env.AWS_SQSURL,
                        ReceiptHandle: message.ReceiptHandle,
                    })
                        .promise()];
            case 3:
                // 处理消息逻辑...
                // 删除已处理的消息
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error('Error receiving message from SQS:', error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.receiveMessageFromQueue = receiveMessageFromQueue;
// 调用发送消息到队列的函数
// sendMessageToQueue({ key: 'value' });
// 调用接收消息的函数
// receiveMessageFromQueue();
//# sourceMappingURL=SQSUtil.js.map