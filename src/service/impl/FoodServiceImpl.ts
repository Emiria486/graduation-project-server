/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 15:56:25
 * @LastEditTime: 2024-04-02 15:19:26
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
  /**
   * Description 向food表添加新菜品
   * @param {any} food_name:string 菜品名称
   * @param {any} price:number  菜品单价
   * @param {any} status:boolean 是否销售
   * @param {any} description:string 菜品描述
   * @param {any} destination:string
   * @param {any} path:string
   * @param {any} filename:string 文件名
   * @returns {any} 是否添加成功
   */
  async addFood(
    food_name: string,
    price: number,
    status: boolean,
    description: string,
    isdelete: number,
    destination: string,
    path: string,
    filename: string
  ): Promise<boolean> {
    // 图片处理
    const oldPath: string = path
    const newPath: string = `${destination}/${filename}`
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
      // 上传图片到S3存储桶的函数，保证在上传完成后再执行数据库更新
      const uploadToS3 = () => {
        return new Promise((resolve, reject) => {
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: filename, // 上传后的文件名
            Body: fs.readFileSync(newPath),
            ACL: 'public-read', // 设置上传后的文件为公共读取权限
          }
          s3.upload(uploadParams, (err: any, data: any) => {
            if (err) {
              console.log('Error:', err)
              reject(err)
            } else {
              awsImage = data.Location //获得图片链接对象
              console.log('Image uploaded successfully. URL:', data.Location)
              resolve(awsImage)
            }
          })
        })
      }
      try {
        const uploadUrl = await uploadToS3()
        const food = new Food(
          food_name,
          price,
          uploadUrl as string,
          status,
          description,
          isdelete
        )
        const updated = await this.foodDao.addFood(food)
        // 上传完以后删除本地文件
        fs.unlinkSync(newPath)
        console.log('成功删除本地文件')
        return updated
      } catch (error) {
        console.error('上传S3失败或上传数据库失败', error)
        return false
      }
    } else {
      return false
    }
  }
  /**
   * Description 更新菜品信息
   * @param {any} food:Food 更新后的菜品信息类
   * @returns {any} 是否修改成功
   */
  async updateFood(food: Food): Promise<boolean> {
    return await this.foodDao.updateFood(food).catch(() => false)
  }
  /**
   * Description 获取所有菜品信息
   * @returns {any}  Food[]：菜品数组或Boolean查询失败
   */
  async getFoodData(): Promise<boolean | Food[]> {
    return this.foodDao.queryAll().catch(() => false)
  }
  /**
   * Description 删除指定id的菜品
   * @param {any} food_id:number 菜品id
   * @returns {any} 是否删除
   */
  async deleteFood(isdelete: number, food_id: number): Promise<boolean> {
    return await this.foodDao.deleteById(isdelete, food_id).catch(() => false)
  }
}
