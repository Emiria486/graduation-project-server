export default class AESHelper {
    /**
     * Description AES加密函数
     * @param {any} word:string 需要加密的字符串
     * @returns {string} 加密后的字符串
     */
    static encrypt(word: string): string;
    /**
     * Description AES加密字符串解密
     * @param {any} word:string   加密后的字符串
     * @returns {string} 解密后的字符串
     */
    static decrypt(word: string): string;
}
