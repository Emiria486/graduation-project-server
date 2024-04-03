/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 10:34:04
 * @LastEditTime: 2024-04-03 12:12:01
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\server.ts
 * @Description: 服务器入口文件
 */
import express, { NextFunction, Request, Response } from 'express'
require('dotenv').config() //要访问配置信息的地方加上，使其配置信息全局可访问
import cors from 'cors'
import * as bodyParser from 'body-parser'
import path from 'path'
import userRouter from './router/userRouter'
import adminRouter from './router/adminRouter'
import ConstantUtil from './utils/ConstantUtil'
import HttpUtil from './utils/HttpUtil'
import orderSocket from './socket/OrderSocket'
import './process' //处理未捕获异常
import { errorHandler } from './exceptions/ErrorHandler'

const app = express()
//引入cors，解决跨域问题
app.use(cors())
//启动websocket服务
orderSocket()
//开放静态资源
app.use('/static/', express.static(path.join(__dirname, './upload/')))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))

const logger = {
  log(err: Error) {
    console.log(`logger: `, err)
  },
}

const messageLogger = {
  sendErrorMessage(err: Error) {
    console.log('sendErrorMessage: ', err)
  },
}

userRouter.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    // 日志记录
    logger.log(err)
    // 发送通知信息
    messageLogger.sendErrorMessage(err)
    next(err)
    errorHandler.handleError(err)
  }
)
adminRouter.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    // 日志记录
    logger.log(err)
    // 发送通知信息
    messageLogger.sendErrorMessage(err)
    next(err)
    errorHandler.handleError(err)
  }
)
app.use('/app', userRouter).use('/lyj', adminRouter)
// 错误处理中间件
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack)
  res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))
})
app.listen(ConstantUtil.port, () =>
  console.log(`http server running in http://localhost:${ConstantUtil.port}`)
)
