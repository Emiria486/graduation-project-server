/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 16:17:42
 * @LastEditTime: 2024-03-27 18:14:50
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\filter\Auth.ts
 * @Description: 管理员token认证过滤器函数
 */
import JWTUtil from '../utils/JWTUtil'
import HttpUtil from '../utils/HttpUtil'

const Auth = (req: any, res: any, next: any): void => {
  //获取header中的token，并验证
  if (!req.headers.authorization) {
    console.log("token校验",req.headers)
    res.status(401).send(HttpUtil.resBody(0, '未授权，请先登录!', null))
  } else {
    const token: string = req.headers.authorization.split(' ').pop()
    let result: any = JWTUtil.verify(token)
    if (result) {
      req.currentId = result.adminId
      req.currentUsername = result.username //将信息存放到 state 中
      console.log("req.currentId", req.currentId)
      console.log("req.currentUsername",req.currentUsername)
      next()
    } else {
      res
        .status(401)
        .send(HttpUtil.resBody(0, '登录信息已过期，请重新登录', null))
    }
  }
}
export default Auth
