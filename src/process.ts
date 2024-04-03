/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-03 10:23:56
 * @LastEditTime: 2024-04-03 11:58:36
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\process.ts
 * @Description: 注册全局的处理函数来捕获异常
 */
import { errorHandler } from './exceptions/ErrorHandler'
process.on('unhandledRejection', (reason: Error) => {
  console.log('on unhandledRejection: ', reason)
  errorHandler.handleError(new Error(reason?.message ?? reason))
})
process.on('uncaughtException', (error) => {
  console.log('on uncaughtException: ', error)
  errorHandler.handleError(error)
})
