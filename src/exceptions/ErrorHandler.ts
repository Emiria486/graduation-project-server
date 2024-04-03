/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-04-03 10:30:10
 * @LastEditTime: 2024-04-03 12:04:38
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\exceptions\ErrorHandler.ts
 * @Description: 根据异常类型处理函数报错
 */
import { Response } from 'express'
import { AppError } from './AppError'
import { StatusCodes } from 'http-status-codes'
class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational
    }

    return false
  }
  public handleError(err: Error | AppError, res?: Response) {
    if (err instanceof AppError && res) {
      this.handleTrustedError(err, res)
    } else {
      this.handleCriticalError(err, res)
    }
  }

  private handleTrustedError(err: AppError, res: Response) {
    res.status(err.httpCode).json({
      message: `error code:${err.httpCode}`,
    })
  }

  private handleCriticalError(err: Error | AppError, res?: Response) {
    if (res) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
      })
    }
    console.log('Server error with: ', err)
    // process.exit(1)
  }
}
export const errorHandler = new ErrorHandler()
