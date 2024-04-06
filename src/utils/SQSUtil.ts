import AWS from 'aws-sdk'
require('dotenv').config() //要访问配置信息的地方加上，使其配置信息全局可访问
import { errorHandler } from '../exceptions/ErrorHandler'
const sqs = new AWS.SQS({ region: process.env.AWS_REGION }) // 根据您的地区配置
// 发送消息到sqs队列
const sendMessageToQueue = async (message: any) => {
  const params: any = {
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.AWS_SQSURL,
  }
  try {
    await sqs.sendMessage(params).promise()
    console.log('Message sent to SQS queue.')
  } catch (error: any) {
    errorHandler.handleError(error)
  }
}
// 从SQS队列接收消息
const receiveMessageFromQueue = async () => {
  const params: any = {
    QueueUrl: process.env.AWS_SQSURL, // 替换成您的SQS队列URL
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 10,
  }

  try {
    const data = await sqs.receiveMessage(params).promise()
    if (data.Messages) {
      const message = data.Messages[0]
      console.log('Received message from SQS:', message.Body)

      // 处理消息逻辑...

      // 删除已处理的消息
      await sqs
        .deleteMessage({
          QueueUrl: process.env.AWS_SQSURL,
          ReceiptHandle: message.ReceiptHandle,
        } as any)
        .promise()
    }
  } catch (error) {
    console.error('Error receiving message from SQS:', error)
  }
}

// 调用发送消息到队列的函数
sendMessageToQueue({ key: 'value' });
// 调用接收消息的函数
receiveMessageFromQueue();