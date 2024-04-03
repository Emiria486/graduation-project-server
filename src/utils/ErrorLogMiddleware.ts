/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-03 18:42:39
 * @LastEditTime: 2024-04-03 19:56:10
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\ErrorLogMiddleware.ts
 * @Description: 错误信息的log上传
 */
import AWS from 'aws-sdk'
import { NextFunction, Request, Response } from 'express'
require('dotenv').config() //要访问配置信息的地方加上，使其配置信息全局可访问
import HttpUtil from './HttpUtil'
import ConstantUtil from './ConstantUtil'

// 配置 AWS CloudWatch Logs
const cloudwatchlogs = new AWS.CloudWatchLogs({
  region: process.env.AWS_REGION,
})

const ErrorLogMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 获取请求信息
  const errMessage = `Error:${err.stack}`
  console.log('错误中间件执行', errMessage)
  const params = {
    logGroupName: process.env.AWS_logGroupName, // 替换为您的日志组名称
    logStreamName: process.env.AWS_logStreamName, // 替换为您的日志流名称
    logEvents: [
      {
        message: errMessage,
        timestamp: new Date().getTime(), // 时间戳
      },
    ],
  }
  // 发送日志事件到CloudWatch Logs
  cloudwatchlogs.putLogEvents(params as any, (err, data) => {
    if (err) {
      console.error('Error sending log event:', err)
    } else {
      console.log('Log event sent successfully:', data)
    }
  })
  res.status(500).send(HttpUtil.resBody(0, ConstantUtil.serverErrMsg, ''))

  //   继续传递请求
  next()
}

export default ErrorLogMiddleware
