/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-19 17:30:39
 * @LastEditTime: 2024-04-01 11:34:17
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\impl\AdminServiceImpl.ts
 * @Description: 管理员server类的实现类
 */
import AdminService from '../AdminService'
import AdminDao from '../../dao/AdminDao'
import AdminDaoImpl from '../../dao/impl/AdminDaoImpl'
import LoginEnum from '../../enum/LoginEnum'
import JWTUtil from '../../utils/JWTUtil'
import Admin from '../../model/Admin'
import * as fs from 'node:fs'
import ConstantUtil from '../../utils/ConstantUtil'
import Food from '../../model/Food'
import FoodDaoImpl from '../../dao/impl/FoodDaoImpl'
import FoodDao from '../../dao/FoodDao'
import AWS from 'aws-sdk'
import AESHelper from '../../utils/AESHelper'
require('dotenv').config() //要访问配置信息的地方加上，使其配置信息全局可访问

export default class AdminServiceImpl implements AdminService {
  private adminDao: AdminDao
  private foodDao: FoodDao
  constructor() {
    this.foodDao = new FoodDaoImpl()
    this.adminDao = new AdminDaoImpl()
  }
  findAllAdmin(): Promise<Admin[]> {
    const admins = this.adminDao.queryAllAdmin()
    console.log('findAllAdmin', admins)
    return admins
  }
  /**
   * Description 管理员登录
   * @param {any} username:string 用户名登录
   * @param {any} password:string 客户端使用AES加密后的密码字符串
   * @returns {string} 生成token字符串
   */
  async login(username: string, password: string): Promise<string> {
    try {
      // 从数据库中取出admin对象
      const admin = await this.adminDao.findByUsername(username)
      if (!admin) {
        // admin为空，用户名登录失败
        return LoginEnum.usernameErr
      }
      //   取出的加密后的密码与在客户端加密后的密码不对，密码登录失败
      else if (
        AESHelper.decrypt(admin.password) !== AESHelper.decrypt(password)
      ) {
        return LoginEnum.passwordErr
      } else {
        // 登录成功，生成token
        return JWTUtil.generate({
          username: admin.username,
          adminId: admin.admin_id,
        })
      }
    } catch (e) {
      return LoginEnum.serverErr
    }
  }
  /**
   * Description 根据指定用户名得到管理员信息
   * @param {any} username:string 指定用户名
   * @returns {admin} 管理员信息或错误提示字符串
   */
  async getAdminInfo(username: string): Promise<Admin | string> {
    try {
      const admin = await this.adminDao.findByUsername(username)
      //   检查头像字符串是否为空
      if (admin.avatar?.length !== 0) {
        return admin
      } else {
        //如果头像为空，返回默认头像
        admin.set_avatar(ConstantUtil.adminDefaultAvatar)
        return admin
      }
    } catch (error) {
      return LoginEnum.serverErr
    }
  }
  /**
   * Description 更新管理员信息
   * @param {any} admin:Admin 更新后的管理员对象
   * @returns {any} Boolean的promise
   */
  async updateAdminInfo(admin: Admin): Promise<boolean> {
    return await this.adminDao.updateInfoByUsername(admin).catch((e) => false)
  }
  /**
   * Description 更新管理员头像（已测试通过）
   * @param {any} originalname:string  文件名
   * @param {any} destination:string 存储路径
   * @param {any} path:string 原来的图片路径
   * @param {any} username:string 管理员用户名
   * @returns {any} boolean
   */
  async updateAdminAvatar(
    originalname: string,
    destination: string,
    path: string,
    username: string
  ): Promise<boolean> {
    const oldPath: string = path
    const newPath: string = `${destination}/${originalname}`
    let uploadPath: string = '' //S3上的对象链接
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath) //注意：如果与newPath同名文件存在，直接覆盖,异步
      // 设置AWS配置信息
      const awsConfig = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      }
      AWS.config.update(awsConfig)
      // 创建S3服务对象
      const s3 = new AWS.S3()

      // 上传图片到S3存储桶的函数,保证在上传完成后再执行数据库更新操作。
      const uploadToS3 = () => {
        return new Promise((resolve, reject) => {
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: originalname, // 上传后的文件名
            Body: fs.readFileSync(newPath),
            ACL: 'public-read', // 设置上传后的文件为公共读取权限
          }
          s3.upload(uploadParams, (err: any, data: any) => {
            if (err) {
              console.log('Error:', err)
              reject(err)
            } else {
              uploadPath = data.Location
              console.log('Image uploaded successfully. URL:', data.Location)
              console.log('uploadPath', uploadPath)
              resolve(data.Location)
            }
          })
        })
      }
      try {
        const uploadUrl = await uploadToS3()
        const updated = await this.adminDao.updateAvatarByUsername(
          username,
          uploadUrl as string
        )
        // 上传完以后删除本地文件
        fs.unlinkSync(newPath)
        console.log('Local file deleted successfully.')
        return updated
      } catch (error) {
        console.error('Error uploading to S3 or updating database:', error)
        return false
      }
    } else {
      return false
    }
  }
  /**
   * Description 校验用户输入的密码是否正确
   * @param {any} username:string 输入的用户名
   * @param {any} password:string 输入的客户端加密后的用户密码
   * @returns {any} Boolean的promise
   */
  async validatePass(username: string, password: string): Promise<boolean> {
    try {
      // 在数据库中取出对象
      const admin: Admin = await this.adminDao.findByUsername(username)
      //   比较数据库中的加密密码与加密后的输入的用户密码是否相同
      const result =
        AESHelper.decrypt(admin.password) === AESHelper.decrypt(password)
      console.log('service', result)
      return result
    } catch (error) {
      return false
    }
  }
  /**
   * Description 更新管理员登录密码
   * @param {any} username:string 用户名
   * @param {any} password:string 客户端加密后的密码字符串
   * @returns {any}
   */
  async updatePass(username: string, password: string): Promise<boolean> {
    return await this.adminDao.updatePassByUsername(
      username,
      AESHelper.decrypt(password)
    )
  }
  /**
   * Description 管理员添加新菜品（不可用，应该使用FoodService的addFood!!!）
   * @param {any} food:Food
   * @returns {any}
   */
  async addNewFood(food: Food): Promise<boolean> {
    return await this.foodDao.addFood(food)
  }

  /**
   * Description 测试AWS环境变量
   * @returns {any}
   */
  envTest() {
    console.log(process.env.AWS_ACCESS_KEY_ID)
    console.log(process.env.AWS_SECRET_ACCESS_KEY)
    console.log(process.env.AWS_BUCKET_NAME)
    console.log(process.env.AWS_REGION)
  }
}
