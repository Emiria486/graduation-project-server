/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 19:50:46
 * @LastEditTime: 2024-03-16 19:58:19
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\filter\UserAuth.ts
 * @Description: 用户token认证过滤器函数
 */
import HttpUtil from '../utils/HttpUtil'
import JWTUtil from '../utils/JWTUtil'
const UserAuth = (req: any, res: any, next: any) => {
  if (!req.headers.authorization) {
    res.status(401).send(HttpUtil.resBody(0, '未授权，请先登录!', null))
  } else {
    const token: string = req.headers.authorization.split(' ').pop()
    let result: any = JWTUtil.verify(token)
    if (result) {
      req.currentId = result.userId
      req.currentUsername = result.username //将信息存放到 state 中
      next()
    } else {
      res.status(401).send(HttpUtil.resBody(0, '登录信息已过期', null))
    }
  }
}
export default UserAuth
