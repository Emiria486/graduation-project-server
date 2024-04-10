"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 09:10:33
 * @LastEditTime: 2024-03-26 11:58:11
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\OrderFood.ts
 * @Description: 订单中菜品数量的实体类
 */
var OrderFood = /** @class */ (function () {
    function OrderFood(food_id2, number, order_id) {
        this.order_id = 0;
        if (order_id) {
            this.order_id = order_id;
            this.food_id2 = food_id2;
            this.number = number;
        }
        else {
            this.food_id2 = food_id2;
            this.number = number;
        }
    }
    OrderFood.prototype.get_order_id = function () {
        return this.order_id;
    };
    OrderFood.prototype.set_order_id = function (_order_id) {
        this.order_id = _order_id;
    };
    OrderFood.prototype.get_food_id2 = function () {
        return this.food_id2;
    };
    OrderFood.prototype.set_food_id2 = function (_food_id2) {
        this.food_id2 = _food_id2;
    };
    OrderFood.prototype.get_number = function () {
        return this.number;
    };
    OrderFood.prototype.set_number = function (_number) {
        this.number = _number;
    };
    return OrderFood;
}());
exports.default = OrderFood;
//# sourceMappingURL=OrderFood.js.map