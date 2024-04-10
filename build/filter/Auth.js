"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 16:17:42
 * @LastEditTime: 2024-03-27 18:14:50
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\filter\Auth.ts
 * @Description: 管理员token认证过滤器函数
 */
var JWTUtil_1 = __importDefault(require("../utils/JWTUtil"));
var HttpUtil_1 = __importDefault(require("../utils/HttpUtil"));
var Auth = function (req, res, next) {
    //获取header中的token，并验证
    if (!req.headers.authorization) {
        console.log("token校验", req.headers);
        res.status(401).send(HttpUtil_1.default.resBody(0, '未授权，请先登录!', null));
    }
    else {
        var token = req.headers.authorization.split(' ').pop();
        var result = JWTUtil_1.default.verify(token);
        if (result) {
            req.currentId = result.adminId;
            req.currentUsername = result.username; //将信息存放到 state 中
            console.log("req.currentId", req.currentId);
            console.log("req.currentUsername", req.currentUsername);
            next();
        }
        else {
            res
                .status(401)
                .send(HttpUtil_1.default.resBody(0, '登录信息已过期，请重新登录', null));
        }
    }
};
exports.default = Auth;
//# sourceMappingURL=Auth.js.map