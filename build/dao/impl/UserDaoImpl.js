"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DBUtil_1 = __importDefault(require("../../utils/DBUtil"));
var AESHelper_1 = __importDefault(require("../../utils/AESHelper"));
var UserDaoImpl = /** @class */ (function () {
    function UserDaoImpl() {
        this.pool = DBUtil_1.default.createPoolConnection();
        this.sql = '';
        this.sqlParams = [];
    }
    /**
     * Description 根据指定用户名查找User
     * @param {any} UserName:string 指定用户名
     * @returns {any} User的promise
     */
    UserDaoImpl.prototype.findByUserName = function (UserName) {
        var _this = this;
        this.sql = 'select * from `user` where `username`=?';
        this.sqlParams = [UserName];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err, result) {
                if (err)
                    reject(err);
                else {
                    console.log(' findByUserName:成功', result[0]);
                    resolve(result[0]);
                }
            });
        });
    };
    /**
     * Description 根据用户id查找用户信息(已测试成功)
     * @param {any} UserId:number
     * @returns {any} user的promise
     */
    UserDaoImpl.prototype.findByUserId = function (UserId) {
        var _this = this;
        this.sql = 'select * from `user` where `user_id` = ?';
        this.sqlParams = [UserId];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err, result) {
                if (err)
                    reject(err);
                else {
                    console.log('findByUserId:成功', result[0]);
                    resolve(result[0]);
                }
            });
        });
    };
    /**
     * Description 根据userId来更新用户信息(已测试成功)
     * @param {any} UserId:number
     * @param {any} username:string 修改后的用户名
     * @param {any} phone:string  修改后的用户手机
     * @param {any} address:string 修改后的用户地址
     * @param {any} email:string    修改后的用户邮件
     * @returns {any} Boolean的promise
     */
    UserDaoImpl.prototype.updateInfoByUserId = function (UserId, username, phone, address, email) {
        var _this = this;
        this.sql =
            'update `user` set `username` = ?, `phone` = ?, `address` = ?,`email`=? where `user_id` = ?';
        this.sqlParams = [username, phone, address, email, UserId];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(false);
                else {
                    console.log('updateInfoByUserId:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 插入一个新用户(已测试成功)
     * @param {any} username:string 插入的新用户名
     * @param {any} password:string 插入的新密码
     * @param {any} email:string  插入的新邮箱
     * @param {any} phone:string  插入的新手机号
     * @returns {any} boolean的promise
     */
    UserDaoImpl.prototype.insertOnce = function (username, password, email, phone) {
        var _this = this;
        this.sql =
            'insert into `user`(`username`,`password`,`email`,`phone`)values(?,?,?,?)';
        var encryptedPassword = AESHelper_1.default.encrypt(password); //把密码加密后存储提高安全性
        this.sqlParams = [username, encryptedPassword, email, phone];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(false);
                else {
                    console.log('insertOnce:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 通过用户id找到未解密的支付密码(已测试成功)
     * @param {any} UserId:number 用户id
     * @returns {any} 为解密的用户密码的字符串的promise
     */
    UserDaoImpl.prototype.findPaymentPassByUserId = function (UserId) {
        var _this = this;
        this.sql = 'select `payment_password` from `user` where `user_id`=?';
        this.sqlParams = [UserId];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err, result) {
                if (err)
                    reject(err);
                else {
                    console.log('findPaymentPassByUserId:成功');
                    console.log('payment_password: ' + result[0].payment_password);
                    resolve(result[0].payment_password);
                }
            });
        });
    };
    /**
     * Description 通过用户id更新用户支付密码（已测试成功）
     * @param {any} UserId:number 用户id
     * @param {any} payment_password:string 更新后的支付密码
     * @returns {any} Boolean的promise
     */
    UserDaoImpl.prototype.updatePaymentPass = function (UserId, payment_password) {
        var _this = this;
        this.sql = 'update `user` set `payment_password`=? where `user_id`=?';
        var encryptedPassword = AESHelper_1.default.encrypt(payment_password); //把密码加密后存储提高安全性
        this.sqlParams = [encryptedPassword, UserId];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(err);
                else {
                    console.log('updatePaymentPass:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 根据用户id更新钱包余额(已测试成功)
     * @param {any} UserId:number 用户id
     * @param {any} price:number  钱包中的变化金额
     * @returns {any} Boolean的promise
     */
    UserDaoImpl.prototype.updateWalletById = function (UserId, price) {
        var _this = this;
        this.sql = 'update `user` set `wallet`=`wallet`+? where `user_id`=?';
        this.sqlParams = [price, UserId];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err) {
                if (err)
                    reject(false);
                else {
                    console.log('updateWalletById:成功');
                    resolve(true);
                }
            });
        });
    };
    /**
     * Description 根据用户id查找用户钱包金额(已测试成功)
     * @param {any} UserId:number 用户id
     * @returns {any} （金额）wallet：number的promise
     */
    UserDaoImpl.prototype.findWalletById = function (UserId) {
        var _this = this;
        this.sql = 'select `wallet` from `user` where `user_id`=?';
        this.sqlParams = [UserId];
        return new Promise(function (resolve, reject) {
            _this.pool.execute(_this.sql, _this.sqlParams, function (err, result) {
                if (err)
                    reject(err);
                else {
                    console.log('findWalletById:成功');
                    console.log('wallet' + result[0].wallet);
                    resolve(result[0].wallet);
                }
            });
        });
    };
    return UserDaoImpl;
}());
exports.default = UserDaoImpl;
//# sourceMappingURL=UserDaoImpl.js.map