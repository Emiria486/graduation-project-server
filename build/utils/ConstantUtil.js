"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 14:53:35
 * @LastEditTime: 2024-03-29 09:18:22
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\ConstantUtil.ts
 * @Description: 服务器网络固定配置文件
 */
var path_1 = __importDefault(require("path"));
var ip_1 = __importDefault(require("ip"));
var ConstantUtil = /** @class */ (function () {
    function ConstantUtil() {
    }
    ConstantUtil.staticDir = function () {
        return "https://".concat(ip_1.default.address(), ":").concat(this.port, "/static");
    };
    ConstantUtil.adminName = 'liuyongjie';
    ConstantUtil.port = 4396;
    ConstantUtil.userDefaultAvatar = 'https://lyjimageerverbucket.s3.ap-southeast-1.amazonaws.com/admin-default.jpg';
    ConstantUtil.adminDefaultAvatar = 'https://lyjimageerverbucket.s3.ap-southeast-1.amazonaws.com/user-default.jpg';
    ConstantUtil.privateKey = 'liuyongjie';
    ConstantUtil.serverErrMsg = '服务器开了小差，请稍后再试~';
    ConstantUtil.uploadAdminProfilePath = path_1.default.join(__dirname, '../upload/lyj/profile');
    ConstantUtil.uploadFoodImagePath = path_1.default.join(__dirname, '../upload/lyj/food');
    return ConstantUtil;
}());
exports.default = ConstantUtil;
//# sourceMappingURL=ConstantUtil.js.map