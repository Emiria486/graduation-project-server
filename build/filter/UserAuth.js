"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 19:50:46
 * @LastEditTime: 2024-03-16 19:58:19
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\filter\UserAuth.ts
 * @Description: 用户token认证过滤器函数
 */
var HttpUtil_1 = __importDefault(require("../utils/HttpUtil"));
var JWTUtil_1 = __importDefault(require("../utils/JWTUtil"));
var UserAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send(HttpUtil_1.default.resBody(0, '未授权，请先登录!', null));
    }
    else {
        var token = req.headers.authorization.split(' ').pop();
        var result = JWTUtil_1.default.verify(token);
        if (result) {
            req.currentId = result.userId;
            req.currentUsername = result.username; //将信息存放到 state 中
            next();
        }
        else {
            res.status(401).send(HttpUtil_1.default.resBody(0, '登录信息已过期', null));
        }
    }
};
exports.default = UserAuth;
//# sourceMappingURL=UserAuth.js.map