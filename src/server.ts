/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 10:34:04
 * @LastEditTime: 2024-04-09 10:37:08
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
import orderSocket from './socket/OrderSocket'
import './process' //处理未捕获异常
import { errorHandler } from './exceptions/ErrorHandler'
import RequestLogMiddleware from './utils/RequestLogMiddleware'
import ErrorLogMiddleware from './utils/ErrorLogMiddleware'

const app = express()
//引入cors，解决跨域问题
app.use(cors())
//启动websocket服务
orderSocket()
//开放静态资源
app.use('/static/', express.static(path.join(__dirname, './upload/')))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
// 统一处理异常
userRouter.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    next(err)
    errorHandler.handleError(err)
  }
)
adminRouter.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    next(err)
    errorHandler.handleError(err)
  }
)
// 运用上传请求log中间件
app.use(RequestLogMiddleware)
// 运用上传异常log中间件
app.use('/app', userRouter).use('/lyj', adminRouter)
app.use(ErrorLogMiddleware)
app.listen(ConstantUtil.port, () =>
  console.log(`http server running in http://localhost:${ConstantUtil.port}`)
)
