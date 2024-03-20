import * as CryptoJS from 'crypto-js'
import ConstantUtil from './ConstantUtil'
export default class AESHelper {
  /**
   * Description AES加密函数
   * @param {any} word:string 需要加密的字符串
   * @returns {string} 加密后的字符串
   */
  public static encrypt(word: string): string {
    const ciphertext = CryptoJS.AES.encrypt(
      word,
      ConstantUtil.privateKey
    ).toString()
    return ciphertext
  }
  /**
   * Description AES加密字符串解密
   * @param {any} word:string   加密后的字符串
   * @returns {string} 解密后的字符串
   */
  public static decrypt(word: string): string {
    let bytes = CryptoJS.AES.decrypt(word, ConstantUtil.privateKey)
    let originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  }
}
