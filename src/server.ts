/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 10:34:04
 * @LastEditTime: 2024-03-27 18:13:03
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\server.ts
 * @Description: 服务器入口文件
 */
import express from 'express'
require('dotenv').config() //要访问配置信息的地方加上，使其配置信息全局可访问
import cors from 'cors'
import * as bodyParser from 'body-parser'
import path from 'path'
import userRouter from './router/userRouter'
import adminRouter from './router/adminRouter'
import ConstantUtil from './utils/ConstantUtil'
import { orderSocket } from './socket/OrderSocket'
const app = express()
//引入cors，解决跨域问题
app.use(cors())
//启动websocket服务
orderSocket()
//开放静态资源
app.use('/static/', express.static(path.join(__dirname, './upload/')))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use('/app', userRouter).use('/lyj', adminRouter)

app.listen(ConstantUtil.port, () =>
  console.log(`http server running in http://localhost:${ConstantUtil.port}`)
)
