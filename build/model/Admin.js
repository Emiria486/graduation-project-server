"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 21:44:49
 * @LastEditTime: 2024-03-25 23:55:15
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\Admin.ts
 * @Description: 管理员实体类
 */
var Admin = /** @class */ (function () {
    function Admin(password, username, phone, avatar, address, shop_name, email, admin_id) {
        if (admin_id) {
            this.admin_id = admin_id;
            this.password = password;
            this.username = username;
            this.phone = phone;
            this.avatar = avatar;
            this.address = address;
            this.shop_name = shop_name;
            this.email = email;
        }
        else {
            this.password = password;
            this.username = username;
            this.phone = phone;
            this.avatar = avatar;
            this.address = address;
            this.shop_name = shop_name;
            this.email = email;
        }
    }
    Admin.prototype.get_admin_id = function () {
        return this.admin_id;
    };
    Admin.prototype.set_admin_id = function (_admin_id) {
        this.admin_id = _admin_id;
    };
    Admin.prototype.get_password = function () {
        return this.password;
    };
    Admin.prototype.set_password = function (_password) {
        this.password = _password;
    };
    Admin.prototype.get_username = function () {
        return this.username;
    };
    Admin.prototype.set_username = function (_username) {
        this.username = _username;
    };
    Admin.prototype.get_phone = function () {
        return this.phone;
    };
    Admin.prototype.set_phone = function (_phone) {
        this.phone = _phone;
    };
    Admin.prototype.get_avatar = function () {
        return this.avatar;
    };
    Admin.prototype.set_avatar = function (avatar) {
        this.avatar = avatar;
    };
    Admin.prototype.get_address = function () {
        return this.address;
    };
    Admin.prototype.set_address = function (_address) {
        this.address = _address;
    };
    Admin.prototype.get_shop_name = function () {
        return this.shop_name;
    };
    Admin.prototype.set_shop_name = function (_shop_name) {
        this.shop_name = _shop_name;
    };
    Admin.prototype.get_email = function () {
        return this.email;
    };
    Admin.prototype.set_email = function (_email) {
        this.email = _email;
    };
    return Admin;
}());
exports.default = Admin;
//# sourceMappingURL=Admin.js.map