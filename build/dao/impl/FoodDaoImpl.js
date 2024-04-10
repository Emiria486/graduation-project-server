"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 20:43:49
 * @LastEditTime: 2024-03-29 20:27:08
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\impl\FoodDaoImpl.ts
 * @Description: 菜品dao实现类
 */
var DBUtil_1 = __importDefault(require("../../utils/DBUtil"));
var FoodDaoImpl = /** @class */ (function () {
    function FoodDaoImpl() {
        this.pool = DBUtil_1.default.createPoolConnection();
        this.sql = '';
        this.sqlParams = [];
    }
    /**
     * Description 添加菜品类(已测试成功)
     * @param {any} food:Food 菜品信息类
     * @returns {any}   boolean的promise
     */
    FoodDaoImpl.prototype.addFood = function (food) {
        var _this = this;
        this.sql =
            'insert into `food`(`food_name`,`price`,`image`,`status`,`description`,`isdelete`)values(?,?,?,?,?,?)';
        this.sqlParams = [
            food.get_food_name(),
            food.get_price(),
            food.get_image(),
            food.get_status(),
            food.get_description(),
            food.get_isdelete(),
        ];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(err);
                else {
                    console.log('addFood:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 修改菜品信息(已测试成功)
     * @param {any} food:Food 菜品信息类
     * @returns {any} Boolean的promise
     */
    FoodDaoImpl.prototype.updateFood = function (food) {
        var _this = this;
        this.sql =
            'update `food` set `food_name`=?,`price`=?,`status`=?,`description`=?,`isdelete`=? where `food_id`=?';
        this.sqlParams = [
            food.get_food_name(),
            food.get_price(),
            food.get_status(),
            food.get_description(),
            food.get_isdelete(),
            food.get_food_id(),
        ];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(err);
                else {
                    console.log('updateFood:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 查询所有菜品(已测试成功)
     * @returns {any} food[]的promise
     */
    FoodDaoImpl.prototype.queryAll = function () {
        var _this = this;
        this.sql = 'select * from `food`';
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, function (err, result) {
                if (err)
                    reject(err);
                else {
                    console.log('queryAll foods:成功', result);
                    resolve(result);
                }
            });
        });
    };
    /**
     * Description 根据菜品id删除菜品(已测试成功)
     * @param {any} food_id:number 菜品id
     * @returns {any} Boolean的promise
     */
    FoodDaoImpl.prototype.deleteById = function (isdelete, food_id) {
        var _this = this;
        this.sql = 'update `food` set `isdelete`=?,`status`=0 where `food_id`=?';
        this.sqlParams = [isdelete, food_id];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(err);
                else {
                    console.log('deleteById:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 指定菜品id查询相关菜品信息(已测试成功)
     * @param {any} food_id:number 指定菜品id
     * @returns {any} food的promise
     */
    FoodDaoImpl.prototype.findById = function (food_id) {
        var _this = this;
        this.sql = 'select * from `food` where `food_id` = ?';
        this.sqlParams = [food_id];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err, result) {
                if (err)
                    reject(err);
                else {
                    console.log('findById:成功', result[0]);
                    resolve(result[0]);
                }
            });
        });
    };
    return FoodDaoImpl;
}());
exports.default = FoodDaoImpl;
//# sourceMappingURL=FoodDaoImpl.js.map