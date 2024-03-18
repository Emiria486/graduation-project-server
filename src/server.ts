/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 10:34:04
 * @LastEditTime: 2024-03-18 19:18:48
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\server.ts
 * @Description: 服务器入口文件
 */
import express from 'express'
import OrderDaoImpl from './dao/impl/OrderDaoImpl'
import OrderFood from './model/OrderFood'
const app = express()
const PORT = 3000
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`)
  const orderType = new OrderDaoImpl().findOrderFoodByOrderId(1)
  console.log('server', orderType)
})
