/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 14:30:15
 * @LastEditTime: 2024-03-16 14:32:28
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\HttpUtil.ts
 * @Description: 响应体封装函数
 */
class HttpUtil {
  public static resBody(
    status: number,
    message: string,
    data: object | [] | string | null
  ): object {
    return {
      status,
      message,
      data,
    }
  }
}
export default HttpUtil
