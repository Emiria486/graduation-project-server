/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-03 10:38:58
 * @LastEditTime: 2024-04-03 11:18:36
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\exceptions\AppError.ts
 * @Description: 自定义异常类
 */
import { StatusCodes } from 'http-status-codes'
interface AppErrorArgs {
  name?: string
  httpCode: StatusCodes
  message: string
  isOperational?: boolean //可信赖异常的判断依据,可信赖的异常额外进行处理,其他异常视为服务器异常处理
}
export class AppError extends Error {
  public readonly name: string
  public readonly httpCode: StatusCodes
  // 是否为严重错误
  public readonly isOperational: boolean = true

  constructor(args: AppErrorArgs) {
    super(args.message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = args.name || this.constructor.name
    this.httpCode = args.httpCode
    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational
    }
    Error.captureStackTrace(this)
  }
}
