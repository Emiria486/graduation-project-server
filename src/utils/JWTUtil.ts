/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 15:09:55
 * @LastEditTime: 2024-03-26 10:50:34
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\JWTUtil.ts
 * @Description: token字符串的生成函数和校验函数
 */
import Jwt from 'jsonwebtoken'
import ConstantUtil from './ConstantUtil'

class JWTUtil {
  /**
   * Description 生成token字符串
   * @param {any} value:any 输入验证信息
   * @param {any} expires:number=60*60*24*30 过期时间默认30天过期
   * @returns {any} token字符串
   */
  public static generate(
    value: any,
    expires: number = 60 * 60 * 24 * 30
  ): string {
    try {
      return Jwt.sign(value, ConstantUtil.privateKey, { expiresIn: expires })
    } catch (e) {
      return ''
    }
  }
  /**
   * Description    校验token字符串
   * @param {any} token:string  token字符串
   * @returns {any} 正确就调用回调，错误就返回false
   */
  public static verify(token: string): any {
    try {
      return Jwt.verify(token, ConstantUtil.privateKey);
  } catch (e) {
      return false;//token过期返回false
  }
  }
}
export default JWTUtil
