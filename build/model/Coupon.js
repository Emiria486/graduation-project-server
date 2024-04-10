"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:57:42
 * @LastEditTime: 2024-03-26 11:47:20
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Coupon.ts
 * @Description: 优惠劵实体类
 */
var Coupon = /** @class */ (function () {
    function Coupon(title, discount, limit, create_time, expirein, coupon_id) {
        if (coupon_id) {
            this.coupon_id = coupon_id;
            this.title = title;
            this.discount = discount;
            this.limit = limit;
            this.create_time = create_time;
            this.expirein = expirein;
        }
        else {
            this.title = title;
            this.discount = discount;
            this.limit = limit;
            this.create_time = create_time;
            this.expirein = expirein;
        }
    }
    Coupon.prototype.get_coupon_id = function () {
        return this.coupon_id;
    };
    Coupon.prototype.set_coupon_id = function (_coupon_id) {
        this.coupon_id = _coupon_id;
    };
    Coupon.prototype.get_title = function () {
        return this.title;
    };
    Coupon.prototype.set_title = function (_title) {
        this.title = _title;
    };
    Coupon.prototype.get_discount = function () {
        return this.discount;
    };
    Coupon.prototype.set_discount = function (_discount) {
        this.discount = _discount;
    };
    Coupon.prototype.get_limit = function () {
        return this.limit;
    };
    Coupon.prototype.set_limit = function (_limit) {
        this.limit = _limit;
    };
    Coupon.prototype.get_create_time = function () {
        return this.create_time;
    };
    Coupon.prototype.set_create_time = function (_create_time) {
        this.create_time = _create_time;
    };
    Coupon.prototype.get_expirein = function () {
        return this.expirein;
    };
    Coupon.prototype.set_expirein = function (_expirein) {
        this.expirein = _expirein;
    };
    Coupon.prototype.toString = function () {
        return "Coupon:".concat(this.title);
    };
    return Coupon;
}());
exports.default = Coupon;
//# sourceMappingURL=Coupon.js.map