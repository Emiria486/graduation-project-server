"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 14:30:15
 * @LastEditTime: 2024-03-16 14:32:28
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\HttpUtil.ts
 * @Description: 响应体封装函数
 */
var HttpUtil = /** @class */ (function () {
    function HttpUtil() {
    }
    HttpUtil.resBody = function (status, message, data) {
        return {
            status: status,
            message: message,
            data: data,
        };
    };
    return HttpUtil;
}());
exports.default = HttpUtil;
//# sourceMappingURL=HttpUtil.js.map