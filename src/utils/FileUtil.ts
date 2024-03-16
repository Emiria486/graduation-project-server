/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 14:36:27
 * @LastEditTime: 2024-03-16 14:41:40
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\fileUtil.ts
 * @Description: 返回标准命名的函数
 */
class FileUtil {
  /**
   * Description 返回（xxx.jpg）时间戳命名的字符串函数
   * @returns {string}
   */
  public static fileName(): string {
    return `${new Date().getTime()}.jpg`
  }
  public static orderId(type: string): string {
    return `${type}${new Date().getTime()}`
  }
}
export default FileUtil
