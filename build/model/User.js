"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 22:14:39
 * @LastEditTime: 2024-03-29 09:24:56
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\User.ts
 * @Description: 用户实体类
 */
var User = /** @class */ (function () {
    function User(username, password, address, avatar, wallet, payment_password, email, phone, user_id) {
        this.username = '';
        this.password = '';
        this.address = '';
        this.avatar = '';
        this.wallet = 0;
        this.payment_password = '';
        this.email = '';
        this.phone = '';
        if (user_id) {
            this.user_id = user_id;
            this.username = username;
            this.password = password;
            this.address = address;
            this.avatar = avatar;
            this.wallet = wallet;
            this.payment_password = payment_password;
            this.email = email;
            this.phone = phone;
        }
        else {
            this.username = username;
            this.password = password;
            this.address = address;
            this.avatar = avatar;
            this.wallet = wallet;
            this.payment_password = payment_password;
            this.email = email;
            this.phone = phone;
        }
    }
    User.prototype.get_user_id = function () {
        return this.user_id;
    };
    User.prototype.set_user_id = function (_user_id) {
        this.user_id = _user_id;
    };
    User.prototype.get_username = function () {
        return this.username;
    };
    User.prototype.set_username = function (_username) {
        this.username = _username;
    };
    User.prototype.get_password = function () {
        return this.password;
    };
    User.prototype.set_password = function (_password) {
        this.password = _password;
    };
    User.prototype.get_address = function () {
        return this.address;
    };
    User.prototype.set_address = function (_address) {
        this.address = _address;
    };
    User.prototype.get_avatar = function () {
        return this.avatar;
    };
    User.prototype.set_avatar = function (_avatar) {
        this.avatar = _avatar;
    };
    User.prototype.getWallet = function () {
        return this.wallet;
    };
    User.prototype.setWallet = function (wallet) {
        this.wallet = wallet;
    };
    User.prototype.get_payment_password = function () {
        return this.payment_password;
    };
    User.prototype.set_payment_password = function (_payment_password) {
        this.payment_password = _payment_password;
    };
    User.prototype.get_email = function () {
        return this.email;
    };
    User.prototype.set_email = function (_email) {
        this.email = _email;
    };
    User.prototype.get_phone = function () {
        return this.phone;
    };
    User.prototype.set_phone = function (_phone) {
        this.phone = _phone;
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.js.map