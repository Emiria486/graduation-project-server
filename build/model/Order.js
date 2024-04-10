"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:31:33
 * @LastEditTime: 2024-03-28 19:24:05
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Order.ts
 * @Description: 头部注释配置模板
 */
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:31:33
 * @LastEditTime: 2024-03-26 11:43:50
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Order.ts
 * @Description: 订单实体类
 */
var Order = /** @class */ (function () {
    function Order(user_id, user_phone, status, create_time, order_type, price, discount, address, order_id) {
        if (order_id) {
            this.order_id = order_id;
            this.user_id = user_id;
            this.user_phone = user_phone;
            this.status = status;
            this.create_time = create_time;
            this.order_type = order_type;
            this.price = price;
            this.discount = discount;
            this.address = address;
        }
        else {
            this.user_id = user_id;
            this.user_phone = user_phone;
            this.status = status;
            this.create_time = create_time;
            this.order_type = order_type;
            this.price = price;
            this.discount = discount;
            this.address = address;
        }
    }
    Order.prototype.get_order_id = function () {
        return this.order_id;
    };
    Order.prototype.set_order_id = function (order_id) {
        this.order_id = order_id;
    };
    Order.prototype.get_user_id = function () {
        return this.user_id;
    };
    Order.prototype.set_user_id = function (user_id) {
        this.user_id = user_id;
    };
    Order.prototype.get_user_phone = function () {
        return this.user_phone;
    };
    Order.prototype.set_user_phone = function (user_phone) {
        this.user_phone = user_phone;
    };
    Order.prototype.get_status = function () {
        return this.status;
    };
    Order.prototype.set_status = function (status) {
        this.status = status;
    };
    Order.prototype.get_create_time = function () {
        return this.create_time;
    };
    Order.prototype.set_create_time = function (_create_time) {
        this.create_time = _create_time;
    };
    Order.prototype.get_order_type = function () {
        return this.order_type;
    };
    Order.prototype.set_order_type = function (_order_type) {
        this.order_type = _order_type;
    };
    Order.prototype.get_price = function () {
        return this.price;
    };
    Order.prototype.set_price = function (_price) {
        this.price = _price;
    };
    Order.prototype.get_discount = function () {
        return this.discount;
    };
    Order.prototype.set_discount = function (_discount) {
        this.discount = _discount;
    };
    Order.prototype.get_address = function () {
        return this.address;
    };
    Order.prototype.set_address = function (_address) {
        this.address = _address;
    };
    return Order;
}());
exports.default = Order;
//# sourceMappingURL=Order.js.map