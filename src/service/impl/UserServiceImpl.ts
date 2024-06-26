/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 19:54:57
 * @LastEditTime: 2024-03-31 20:44:11
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\impl\UserServiceImpl.ts
 * @Description: 用户service的实现类
 */
import UserService from '../UserService'
import LoginEnum from '../../enum/LoginEnum'
import UserDao from '../../dao/UserDao'
import UserDaoImpl from '../../dao/impl/UserDaoImpl'
import User from '../../model/User'
import JWTUtil from '../../utils/JWTUtil'
import RegisterEnum from '../../enum/RegisterEnum'
import ConstantUtil from '../../utils/ConstantUtil'
import AESHelper from '../../utils/AESHelper'

export default class UserServiceImpl implements UserService {
  private UserDao: UserDao
  constructor() {
    this.UserDao = new UserDaoImpl()
  }
  /**
   * Description 登录函数 (已测试通过)
   * @param {any} username:string 用户名
   * @param {any} password:string 用户密码
   * @returns {any} LoginEnum：提示字符串 | string token
   */
  async login(username: string, password: string): Promise<LoginEnum | string> {
    try {
      const user = await this.UserDao.findByUserName(username)
      if (!user) {
        return LoginEnum.usernameErr
      } else if (
        AESHelper.decrypt(user.password) !== AESHelper.decrypt(password)
      ) {
        console.log('user.password', user.password)
        console.log('password参数', password)
        return LoginEnum.passwordErr
      } else {
        return JWTUtil.generate({
          username: user.username,
          userId: user.user_id,
        })
      }
    } catch (error) {
      console.log(error)
      return LoginEnum.serverErr
    }
  }
  /**
   * Description
   * @param {any} username:string 用户名
   * @param {any} password:string 注册密码
   * @param {any} email:string    邮箱
   * @param {any} phone:string  手机号
   * @returns {any} RegisterEnum：登录提示字符串
   */
  async register(
    username: string,
    password: string,
    email: string,
    phone: string
  ): Promise<RegisterEnum> {
    try {
      const user = await this.UserDao.findByUserName(username)
      if (user !== undefined) {
        return RegisterEnum.userExist
      } else {
        const addResult = await this.UserDao.insertOnce(
          username,
          AESHelper.decrypt(password),
          email,
          phone
        )
        if (addResult) return RegisterEnum.success
        else return RegisterEnum.serverErr
      }
    } catch (error) {
      console.log(error)
      return RegisterEnum.serverErr
    }
  }

  /**
   * Description 更新指定id的用户信息
   * @param {any} userId:number 用户id
   * @param {any} username:string 用户名
   * @param {any} phone:string 手机号
   * @param {any} address:string 地址
   * @param {any} email:string 邮箱
   * @returns {any} 是否更新成功
   */
  async updateUserInfo(
    userId: number,
    username: string,
    phone: string,
    address: string,
    email: string
  ): Promise<boolean> {
    return await this.UserDao.updateInfoByUserId(
      userId,
      username,
      phone,
      address,
      email
    )
  }
  /**
   * Description 获取指定id的用户信息
   * @param {any} userId:number 指定id
   * @returns {any} User：用户信息 null：查询为空
   */
  async getUserInfo(userId: number): Promise<User | null> {
    try {
      let user: User = await this.UserDao.findByUserId(userId)
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }
  /**
   * Description 获得指定id的支付密码
   * @param {any} userId:number 指定id
   * @returns {any} 加密后的支付密码字符串
   */
  async getPaymentPass(userId: number): Promise<string | boolean> {
    try {
      let result = await this.UserDao.findPaymentPassByUserId(userId)
      if (result.length === 0) {
        return false
      } else {
        return result
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  /**
   * Description 更新指定id的用户支付密码
   * @param {any} userId:number 指定id
   * @param {any} payment_password:string 客户端加密后的支付密码
   * @returns {any} 是否更新成功
   */
  async updatePaymentPass(
    userId: number,
    payment_password: string
  ): Promise<boolean> {
    return await this.UserDao.updatePaymentPass(
      userId,
      AESHelper.decrypt(payment_password)
    ).catch(() => false)
  }
  /**
   * Description 校验支付密码是否正确
   * @param {any} userId:number 用户id
   * @param {any} payment_password:string 客户端加密后的支付密码
   * @returns {any}
   */
  async validatePaymentPass(
    userId: number,
    payment_password: string
  ): Promise<boolean> {
    try {
      let DBPassword = await this.UserDao.findPaymentPassByUserId(userId)
      return (
        AESHelper.decrypt(DBPassword) === AESHelper.decrypt(payment_password)
      )
    } catch (error) {
      console.log(error)
      return false
    }
  }
  /**
   * Description 更新用户钱包余额
   * @param {any} userId:number 指定id
   * @param {any} price:number 扣除金额
   * @returns {any} 是否更新成功
   */
  async updateUserWallet(userId: number, price: number): Promise<boolean> {
    return await this.UserDao.updateWalletById(userId, price).catch(() => false)
  }
  /**
   * Description 找到指定id的用户钱包余额
   * @param {any} userId:number 指定id
   * @returns {any} 钱包余额或查询失败
   */
  async findUserWallet(userId: number): Promise<number | boolean> {
    return await this.UserDao.findWalletById(userId).catch(() => false)
  }
}
