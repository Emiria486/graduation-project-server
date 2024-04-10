"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = __importStar(require("crypto-js"));
var ConstantUtil_1 = __importDefault(require("./ConstantUtil"));
var AESHelper = /** @class */ (function () {
    function AESHelper() {
    }
    /**
     * Description AES加密函数
     * @param {any} word:string 需要加密的字符串
     * @returns {string} 加密后的字符串
     */
    AESHelper.encrypt = function (word) {
        var ciphertext = CryptoJS.AES.encrypt(word, ConstantUtil_1.default.privateKey).toString();
        return ciphertext;
    };
    /**
     * Description AES加密字符串解密
     * @param {any} word:string   加密后的字符串
     * @returns {string} 解密后的字符串
     */
    AESHelper.decrypt = function (word) {
        var bytes = CryptoJS.AES.decrypt(word, ConstantUtil_1.default.privateKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    };
    return AESHelper;
}());
exports.default = AESHelper;
//# sourceMappingURL=AESHelper.js.map