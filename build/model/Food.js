"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:22:19
 * @LastEditTime: 2024-03-26 18:23:38
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Food.ts
 * @Description: 菜品实体类
 */
var Food = /** @class */ (function () {
    function Food(food_name, price, image, status, description, isdelete, food_id //将id作为可选参数
    ) {
        if (food_id) {
            //验证是否存在
            this.food_id = food_id;
            this.food_name = food_name;
            this.price = price;
            this.image = image;
            this.status = status;
            this.description = description;
            this.isdelete = isdelete;
        }
        else {
            this.food_name = food_name;
            this.price = price;
            this.image = image;
            this.status = status;
            this.description = description;
            this.isdelete = isdelete;
        }
    }
    Food.prototype.get_isdelete = function () {
        return this.isdelete;
    };
    Food.prototype.set_isdelete = function (isdelete) {
        this.isdelete = isdelete;
    };
    Food.prototype.get_food_id = function () {
        return this.food_id;
    };
    Food.prototype.set_food_id = function (_food_id) {
        this.food_id = _food_id;
    };
    Food.prototype.get_food_name = function () {
        return this.food_name;
    };
    Food.prototype.set_food_name = function (_food_name) {
        this.food_name = _food_name;
    };
    Food.prototype.get_price = function () {
        return this.price;
    };
    Food.prototype.set_price = function (_price) {
        this.price = _price;
    };
    Food.prototype.get_image = function () {
        return this.image;
    };
    Food.prototype.set_image = function (_image) {
        this.image = _image;
    };
    Food.prototype.get_status = function () {
        return this.status;
    };
    Food.prototype.set_status = function (_status) {
        this.status = _status;
    };
    Food.prototype.get_description = function () {
        return this.description;
    };
    Food.prototype.set_description = function (_description) {
        this.description = _description;
    };
    return Food;
}());
exports.default = Food;
//# sourceMappingURL=Food.js.map