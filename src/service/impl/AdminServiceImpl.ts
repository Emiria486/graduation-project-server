/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-19 17:30:39
 * @LastEditTime: 2024-03-19 22:42:24
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\impl\AdminServiceImpl.ts
 * @Description: 头部注释配置模板
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
import AESHelper from '../../utils/AESHelper'
import FoodDaoImpl from '../../dao/impl/FoodDaoImpl'
import FoodDao from '../../dao/FoodDao'

export default class AdminServiceImpl implements AdminService {
  private adminDao: AdminDao
  private foodDao: FoodDao
  constructor() {
    this.foodDao = new FoodDaoImpl()
    this.adminDao = new AdminDaoImpl()
  }
  async login(username: string, password: string): Promise<string> {
    try {
      // 从数据库中取出admin对象
      const admin = await this.adminDao.findByUsername(username)
      if (!admin) {
        // admin为空，用户名登录失败
        return LoginEnum.usernameErr
      }
      //   加入取出的密码与加密后的密码不对，密码登录失败
      else if (admin.get_password() !== AESHelper.encrypt(password)) {
        return LoginEnum.passwordErr
      } else {
        // 登录成功，生成token
        return JWTUtil.generate({ username: admin.get_username() })
      }
    } catch (e) {
      return LoginEnum.serverErr
    }
  }
  async getAdminInfo(username: string): Promise<Admin | string> {
    try {
      const admin = await this.adminDao.findByUsername(username)
      //   检查头像字符串是否为空
      if (admin.get_avatar().length === 0) {
        return admin
      } else {
        //如果头像为空，返回默认头像
        admin.set_avatar(`${ConstantUtil.staticDir()}/lyj/profile/default.png`)
        return admin
      }
    } catch (error) {
      return LoginEnum.serverErr
    }
  }
  async updateAdminInfo(admin: Admin): Promise<boolean> {
    return await this.adminDao.updateInfoByUsername(admin).catch(() => false)
  }
  async updateAdminAvatar(
    originalname: string,
    destination: string,
    path: string,
    username: string
  ): Promise<boolean> {
    const oldPath: string = path
    const newPath: string = `${destination}/${originalname}`
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath) //注意：如果与newPath同名文件存在，直接覆盖
      const uploadPath: string = `${ConstantUtil.staticDir()}/HKUST/profile/${originalname}`
      return await this.adminDao
        .updateAvatarByUsername(username, uploadPath)
        .catch(() => false)
    } else {
      return false
    }
  }
  /**
   * Description 校验用户输入的密码是否正确
   * @param {any} username:string 输入的用户名
   * @param {any} password:string 输入的用户密码
   * @returns {any} Boolean的promise
   */
  async validatePass(username: string, password: string): Promise<boolean> {
    try {
      // 在数据库中取出对象
      const admin: Admin = await this.adminDao.findByUsername(username)
      //   比较数据库中的加密密码与加密后的输入的用户密码是否相同
      return admin.get_password() === AESHelper.encrypt(password)
    } catch (error) {
      return false
    }
  }
  async updatePass(username: string, password: string): Promise<boolean> {
    return await this.adminDao.updatePassByUsername(username, password)
  }
  async addNewFood(food: Food): Promise<boolean> {
    return await this.foodDao.addFood(food)
  }
}
