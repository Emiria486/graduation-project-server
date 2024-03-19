/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 10:34:04
 * @LastEditTime: 2024-03-19 16:29:51
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\server.ts
 * @Description: 服务器入口文件
 */
import express from 'express'
import OrderDaoImpl from './dao/impl/OrderDaoImpl'
import Order from './model/Order'
import OrderFood from './model/OrderFood'
const app = express()
const PORT = 3000
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`)
  const order = new Order(
    1,
    '13281819406',
    false,
    '2024-03-19 15:51:40',
    1,
    20,
    0,
    '店内就餐'
  )
  const orderFood1 = new OrderFood(1, 1, 10)
  const orderFood2 = new OrderFood(1, 2, 10)
  const orderFoods = [orderFood1, orderFood2]
  const impl = new OrderDaoImpl().findOrderFoodByOrderId(1)
  console.log('server', impl)
})
