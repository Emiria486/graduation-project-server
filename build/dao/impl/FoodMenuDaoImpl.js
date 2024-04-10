"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-18 20:49:33
 * @LastEditTime: 2024-03-19 09:47:49
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\impl\FoodMenuDaoImpl.ts
 * @Description: 菜单类的dao实现类
 */
var DBUtil_1 = __importDefault(require("../../utils/DBUtil"));
var FoodMenuDaoImpl = /** @class */ (function () {
    function FoodMenuDaoImpl() {
        this.pool = DBUtil_1.default.createPoolConnection();
        this.sql = '';
        this.sqlParams = [];
    }
    /**
     * Description 根据菜单id删除对应的记录(已测试成功)
     * @param {any} food_menu_id:number 菜单id
     * @returns {any} 是否添加成功的promise
     */
    FoodMenuDaoImpl.prototype.deleteFoodMenuById = function (food_menu_id) {
        var _this = this;
        this.sql = 'delete from `food_menu` where `food_menu_id`=?';
        this.sqlParams = [food_menu_id];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(err);
                else {
                    console.log('删除菜单成功:deleteFoodMenuById');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 根据food_menu_id来更新菜单菜品供应数量(已测试成功)
     * @param {any} number:number 菜品供应数量
     * @param {any} food_menu_id:number 菜单id
     * @returns {any} 是否添加成功的promise
     */
    FoodMenuDaoImpl.prototype.updateFoodMenuNumByFoodMenuId = function (number, food_menu_id) {
        var _this = this;
        this.sql = 'update `food_menu` set `number` =? where `food_menu_id`=?';
        this.sqlParams = [number, food_menu_id];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(false);
                else {
                    console.log('更新菜单成功:updateFoodMenuNumByFoodMenuId');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 根据food_id来更新菜单菜品供应数量(测试成功)
     * @param {any} number:number 菜品供应量
     * @param {any} food_id:number
     * @returns {any} 是否添加成功的promise
     */
    FoodMenuDaoImpl.prototype.updateFoodMenuNumByFoodId = function (number, food_id) {
        var _this = this;
        this.sql = 'update `food_menu` set `number` =? where `food_id`=?';
        this.sqlParams = [number, food_id];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(false);
                else {
                    console.log('更新菜单成功:updateFoodMenuNumByFoodId');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 添加菜单（已测试成功）
     * @param {any} food_id:number 菜品id
     * @param {any} number:number  菜品供应数量
     * @param {any} date:string    属于周几的菜单
     * @returns {boolean}  是否添加成功的promise
     */
    FoodMenuDaoImpl.prototype.addFoodMenu = function (food_id, number, date) {
        var _this = this;
        this.sql =
            'insert into `food_menu`(`food_id`, `number`, `date`) values (?, ?, ?)';
        this.sqlParams = [food_id, number, date];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(false);
                else {
                    console.log('添加菜单成功:addFoodMenu');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 按周几搜索符合周几的全部菜单 （已测试成功）
     * @param {any} date:string 周几，默认为周一
     * @returns {any} FoodMenu[]的promise
     */
    FoodMenuDaoImpl.prototype.queryByDate = function (date) {
        var _this = this;
        this.sql = 'select * from `food_menu` where `date`=?';
        this.sqlParams = [date];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err, result) {
                if (err)
                    reject(err);
                else {
                    console.log("".concat(date, "\u8FD9\u5929\u7684\u83DC\u5355:queryByDate"), result);
                    resolve(result);
                }
            });
        });
    };
    /**
     * Description 按照周几和food_id搜索符合条件的全部菜单（已测试成功）
     * @param {any} food_id:number
     * @param {any} date:string
     * @returns {any} foodMenu的promise
     */
    FoodMenuDaoImpl.prototype.findByFoodIdAndDate = function (food_id, date) {
        var _this = this;
        this.sql = 'select * from `food_menu` where `food_id` =? and `date` = ?';
        this.sqlParams = [food_id, date];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err, result) {
                if (err)
                    reject(err);
                else {
                    console.log('findByFoodIdAndDate成功', result);
                    resolve(result[0]);
                }
            });
        });
    };
    return FoodMenuDaoImpl;
}());
exports.default = FoodMenuDaoImpl;
//# sourceMappingURL=FoodMenuDaoImpl.js.map