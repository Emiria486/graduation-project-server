/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 14:23:27
 * @LastEditTime: 2024-03-16 14:29:01
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\FormatUtil.ts
 * @Description: 时间标准化函数
 */
class FormatUtil {
  /**
   * Description 返回格式化日期函数
   * @param {any} time:string|number 时间字符串或时间戳
   * @returns {any} 返回'yyyy-mm-dd hour:minute:second'格式字符串
   */
  public static dateFormat(time: string | number): string {
    const date: Date = new Date(time)
    let year: number = date.getFullYear()
    let month: number | string = date.getMonth() + 1
    let day: number | string = date.getDate()
    let hour: number | string = date.getHours()
    let minute: number | string = date.getMinutes()
    let second: number | string = date.getSeconds()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    if (hour < 10) hour = '0' + hour
    if (minute < 10) hour = '0' + minute
    if (second < 10) second = '0' + second
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
}
export default FormatUtil
