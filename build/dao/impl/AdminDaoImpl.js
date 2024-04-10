"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DBUtil_1 = __importDefault(require("../../utils/DBUtil"));
var Admin_1 = __importDefault(require("../../model/Admin"));
var AESHelper_1 = __importDefault(require("../../utils/AESHelper"));
var AdminDaoImpl = /** @class */ (function () {
    function AdminDaoImpl() {
        this.pool = DBUtil_1.default.createPoolConnection();
        this.sql = '';
        this.sqlParams = [];
    }
    /**
     * Description 查询所有的管理员信息
     * @returns {any}
     */
    AdminDaoImpl.prototype.queryAllAdmin = function () {
        var _this = this;
        this.sql = 'select * from `admin`';
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, function (err, result) {
                if (err)
                    reject(err);
                else {
                    if (result.length !== 0) {
                        resolve(result);
                    }
                    else {
                        reject(null);
                    }
                }
            });
        });
    };
    /**
     * Description 根据管理员用户名找到对应管理员(已测试成功)
     * @param {any} username:string 管理员用户名
     * @returns {any} Admin类的promise
     */
    AdminDaoImpl.prototype.findByUsername = function (username) {
        var _this = this;
        // 使用sql预处理防止注入攻击和提高查询性能
        this.sql = 'select * from `admin` where `username` = ?';
        this.sqlParams = [username];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err, result) {
                if (err)
                    reject(err);
                if (result.length !== 0) {
                    var admin = new Admin_1.default(result[0].password, result[0].username, result[0].phone, result[0].avatar, result[0].address, result[0].shop_name, result[0].email, result[0].admin_id);
                    console.log('findByUsername:成功');
                    console.log('查到的admin', admin);
                    resolve(admin);
                }
                else {
                    reject(null);
                }
            });
        });
    };
    /**
     * Description 按用户名更新用户信息表数据(已测试成功)
     * @param {any} admin:Admin 管理员更新后的信息
     * @returns {Boolean} Boolean的promise
     */
    AdminDaoImpl.prototype.updateInfoByUsername = function (admin) {
        var _this = this;
        this.sql =
            'update `admin` set `shop_name`=?,`phone`=?,`address`=?,`email`=? where `username`=?';
        this.sqlParams = [
            admin.get_shop_name(),
            admin.get_phone(),
            admin.get_address(),
            admin.get_email(),
            admin.get_username(),
        ];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(false);
                else {
                    console.log('updateInfoByUsername:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 根据用户名来更新密码(已测试成功)
     * @param {any} username:string 用户名
     * @param {any} password:string 更新后的用户密码
     * @returns {any} boolean的promise
     */
    AdminDaoImpl.prototype.updatePassByUsername = function (username, password) {
        var _this = this;
        this.sql = 'update `admin` set `password` = ? where `username` = ?';
        var encryptedPassword = AESHelper_1.default.encrypt(password); //把密码加密后存储提高安全性
        this.sqlParams = [encryptedPassword, username];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(false);
                else {
                    console.log('updatePassByUsername:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 根据用户名修改用户头像(已测试成功)
     * @param {any} username:string 用户名
     * @param {any} uploadPath:string 用户图片链接
     * @returns {any} Boolean的promise
     */
    AdminDaoImpl.prototype.updateAvatarByUsername = function (username, uploadPath) {
        var _this = this;
        this.sql = 'update `admin` set `avatar` = ? where `username` = ?';
        this.sqlParams = [uploadPath, username];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(err);
                else {
                    console.log('updateAvatarByUsername:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 找到第一个管理员（已测试成功）
     * @returns {any} admin的promise
     */
    AdminDaoImpl.prototype.findFirstOnce = function () {
        var _this = this;
        this.sql = 'select * from `admin` limit 1 offset 0';
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, function (err, results) {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                }
                else {
                    console.log('findFirstOnce:成功', results[0]);
                    resolve(results[0]);
                }
            });
        });
    };
    return AdminDaoImpl;
}());
exports.default = AdminDaoImpl;
//# sourceMappingURL=AdminDaoImpl.js.map