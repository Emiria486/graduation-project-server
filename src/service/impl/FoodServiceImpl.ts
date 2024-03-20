/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 15:56:25
 * @LastEditTime: 2024-03-20 16:20:20
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\impl\FoodServiceImpl.ts
 * @Description:菜品service的实现类
 */
import FoodService from '../FoodService'
import Food from '../../model/Food'
import FoodDao from '../../dao/FoodDao'
import FoodDaoImpl from '../../dao/impl/FoodDaoImpl'
import * as fs from 'node:fs'
import AWS from 'aws-sdk'
require('dotenv').config() //要访问配置信息的地方加上，使其配置信息全局可访问
export default class FoodServiceImpl implements FoodService {
  private foodDao: FoodDao
  constructor() {
    this.foodDao = new FoodDaoImpl()
  }
  async addFood(
    food_name: string,
    price: number,
    status: boolean,
    description: string,
    destination: string,
    path: string,
    filename: string
  ): Promise<boolean> {
    // 图片处理
    const oldPath: string = path
    const newPath: string = `${destination}/${filename}.jpg`
    let awsImage = ''
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath)
      // 设置AWS配置信息
      const awsConfig = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      }
      AWS.config.update(awsConfig)
      // 创建S3服务对象
      const s3 = new AWS.S3()
      // 上传图片到S3存储桶
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: filename, // 上传后的文件名
        Body: fs.readFileSync(newPath),
        ACL: 'public-read', // 设置上传后的文件为公共读取权限
      }
      s3.upload(uploadParams, (err: any, data: any) => {
        if (err) {
          console.log('Error:', err)
          return false
        } else {
          awsImage = data.Location //获得图片链接对象
          console.log('Image uploaded successfully. URL:', data.Location)
        }
      })
      const food = new Food(food_name, price, awsImage, status, description)
      return await this.foodDao.addFood(food).catch(() => false)
    } else {
      return false
    }
  }
  async updateFood(food: Food): Promise<boolean> {
    return await this.foodDao.updateFood(food).catch(() => false)
  }
  async getFoodData(): Promise<boolean | Food[]> {
    return this.foodDao.queryAll().catch(() => false)
  }
  async deleteFood(food_id: number): Promise<boolean> {
    return await this.foodDao.deleteById(food_id).catch(() => false)
  }
}
