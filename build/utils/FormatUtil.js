"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 14:23:27
 * @LastEditTime: 2024-03-16 14:29:01
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\FormatUtil.ts
 * @Description: 时间标准化函数
 */
var FormatUtil = /** @class */ (function () {
    function FormatUtil() {
    }
    /**
     * Description 返回格式化日期函数
     * @param {any} time:string|number 时间字符串或时间戳
     * @returns {any} 返回'yyyy-mm-dd hour:minute:second'格式字符串
     */
    FormatUtil.dateFormat = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        if (month < 10)
            month = '0' + month;
        if (day < 10)
            day = '0' + day;
        if (hour < 10)
            hour = '0' + hour;
        if (minute < 10)
            hour = '0' + minute;
        if (second < 10)
            second = '0' + second;
        return "".concat(year, "-").concat(month, "-").concat(day, " ").concat(hour, ":").concat(minute, ":").concat(second);
    };
    return FormatUtil;
}());
exports.default = FormatUtil;
//# sourceMappingURL=FormatUtil.js.map