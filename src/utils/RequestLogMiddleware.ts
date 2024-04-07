/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-03 18:20:36
 * @LastEditTime: 2024-04-07 14:51:14
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\RequestLogMiddleware.ts
 * @Description: 自定义log中间件，将客户端的请求进行上传到aws cloudwatch logs方便运维查看
 */
import AWS from 'aws-sdk'
import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../exceptions/ErrorHandler'
require('dotenv').config() //要访问配置信息的地方加上，使其配置信息全局可访问
// 配置 AWS CloudWatch Logs
const cloudwatchlogs = new AWS.CloudWatchLogs({
  region: process.env.AWS_REGION,
})
// Express 日志中间件定义
const RequestLogMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 获取请求信息
  const logMessage = `${req.method} ${req.originalUrl} - ${res.statusCode}`
  console.log('请求log中间件执行', logMessage)
  // 将日志发送到 AWS CloudWatch Logs
  const params = {
    logGroupName: process.env.AWS_logGroupName, // 替换为env的日志组名称
    logStreamName: process.env.AWS_logStreamName, // 替换为env的日志流名称
    logEvents: [
      {
        message: logMessage,
        timestamp: new Date().getTime(),
      },
    ],
  }
  // 发送日志
  cloudwatchlogs.putLogEvents(
    params as AWS.CloudWatchLogs.PutLogEventsRequest,
    (err, data) => {
      if (err) {
        errorHandler.handleError(err)
      } else {
        console.log('Log sent to CloudWatch successfully:', data)
      }
    }
  )
  //   继续传递请求
  next()
}

export default RequestLogMiddleware
