"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FoodMenu = /** @class */ (function () {
    function FoodMenu(food_menu_id, food_id, number, date) {
        this.food_menu_id = food_menu_id;
        this.food_id = food_id;
        this.number = number;
        this.date = date;
    }
    FoodMenu.prototype.get_food_menu_id = function () {
        return this.food_menu_id;
    };
    FoodMenu.prototype.set_food_menu_id = function (_food_menu_id) {
        this.food_menu_id = _food_menu_id;
    };
    FoodMenu.prototype.get_food_id = function () {
        return this.food_id;
    };
    FoodMenu.prototype.set_food_id = function (_food_id) {
        this.food_id = _food_id;
    };
    FoodMenu.prototype.get_number = function () {
        return this.number;
    };
    FoodMenu.prototype.set_number = function (_number) {
        this.number = _number;
    };
    FoodMenu.prototype.get_date = function () {
        return this.date;
    };
    FoodMenu.prototype.set_date = function (_date) {
        this.date = _date;
    };
    return FoodMenu;
}());
exports.default = FoodMenu;
//# sourceMappingURL=FoodMenu.js.map