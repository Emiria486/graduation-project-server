"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 09:03:42
 * @LastEditTime: 2024-03-19 11:40:08
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\OrderType.ts
 * @Description: 订单种类实体类
 */
var OrderType = /** @class */ (function () {
    function OrderType(order_type, order_type_id) {
        this.order_type_id = 0; //mysql 数据库里面设置了id自增，所以为了避免在构造函数里面手动添加id值，直接使用默认赋值
        if (order_type_id) {
            this.order_type_id = order_type_id;
            this.order_type = order_type;
        }
        else {
            this.order_type = order_type;
        }
    }
    OrderType.prototype.get_order_type_id = function () {
        return this.order_type_id;
    };
    OrderType.prototype.set_order_type_id = function (_order_type_id) {
        this.order_type_id = _order_type_id;
    };
    OrderType.prototype.get_order_type = function () {
        return this.order_type;
    };
    OrderType.prototype.set_order_type = function (_order_type) {
        this.order_type = _order_type;
    };
    return OrderType;
}());
exports.default = OrderType;
//# sourceMappingURL=OrderType.js.map