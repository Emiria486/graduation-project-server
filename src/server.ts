/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 10:34:04
 * @LastEditTime: 2024-03-20 22:33:51
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\server.ts
 * @Description: 服务器入口文件
 */
import express from 'express'
require('dotenv').config() //要访问配置信息的地方加上，使其配置信息全局可访问
import AdminServiceImpl from './service/impl/AdminServiceImpl'
const app = express()
const PORT = 3000
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.listen(PORT, () => {
  const service = new AdminServiceImpl().getAdminInfo("tom")
  console.log("service",service)
  console.log(`Express with Typescript! http://localhost:${PORT}`)
})
