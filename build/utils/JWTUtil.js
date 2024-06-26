"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 15:09:55
 * @LastEditTime: 2024-03-26 10:50:34
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\JWTUtil.ts
 * @Description: token字符串的生成函数和校验函数
 */
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ConstantUtil_1 = __importDefault(require("./ConstantUtil"));
var JWTUtil = /** @class */ (function () {
    function JWTUtil() {
    }
    /**
     * Description 生成token字符串
     * @param {any} value:any 输入验证信息
     * @param {any} expires:number=60*60*24*30 过期时间默认30天过期
     * @returns {any} token字符串
     */
    JWTUtil.generate = function (value, expires) {
        if (expires === void 0) { expires = 60 * 60 * 24 * 30; }
        try {
            return jsonwebtoken_1.default.sign(value, ConstantUtil_1.default.privateKey, { expiresIn: expires });
        }
        catch (e) {
            return '';
        }
    };
    /**
     * Description    校验token字符串
     * @param {any} token:string  token字符串
     * @returns {any} 正确就调用回调，错误就返回false
     */
    JWTUtil.verify = function (token) {
        try {
            return jsonwebtoken_1.default.verify(token, ConstantUtil_1.default.privateKey);
        }
        catch (e) {
            return false; //token过期返回false
        }
    };
    return JWTUtil;
}());
exports.default = JWTUtil;
//# sourceMappingURL=JWTUtil.js.map