/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 19:54:57
 * @LastEditTime: 2024-03-20 21:31:27
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

export default class UserServiceImpl implements UserService {
  private UserDao: UserDao
  constructor() {
    this.UserDao = new UserDaoImpl()
  }
  async login(username: string, password: string): Promise<LoginEnum | string> {
    try {
      const user = await this.UserDao.findByUserName(username)
      if (!user) {
        return LoginEnum.usernameErr
      } else if (user.get_password() !== password) {
        return LoginEnum.passwordErr
      } else {
        return JWTUtil.generate({
          username: user.get_username(),
          userId: user.get_user_id(),
        })
      }
    } catch (error) {
      console.log(error)
      return LoginEnum.serverErr
    }
  }
  async register(
    username: string,
    password: string,
    email: string,
    phone: string
  ): Promise<RegisterEnum> {
    try {
      const user = await this.UserDao.findByUserName(username)
      if (!user) {
        return RegisterEnum.userExist
      } else {
        const addResult = await this.UserDao.insertOnce(
          username,
          password,
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
  async getUserInfo(userId: number): Promise<User | null> {
    try {
      let user = await this.UserDao.findByUserId(userId)
      if (!user.get_avatar()) {
        //头像为空
        user.set_avatar(ConstantUtil.userDefaultAvatar)
        return user
      } else {
        return user
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async getPaymentPass(userId: number): Promise<string | boolean> {
    try {
      return await this.UserDao.findPaymentPassByUserId(userId)
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async updatePaymentPass(
    userId: number,
    payment_password: string
  ): Promise<boolean> {
    return await this.UserDao.updatePaymentPass(userId, payment_password).catch(
      () => false
    )
  }
  async validatePaymentPass(
    userId: number,
    payment_password: string
  ): Promise<boolean> {
    try {
      let DBPassword = await this.UserDao.findPaymentPassByUserId(userId)
      return DBPassword === payment_password
    } catch (error) {
      console.log(error)
      return false
    }
  }
  async updateUserWallet(userId: number, price: number): Promise<boolean> {
    return await this.UserDao.updateWalletById(userId, price).catch(() => false)
  }
  async findUserWallet(userId: number): Promise<number | boolean> {
    return await this.UserDao.findWalletById(userId).catch(() => false)
  }
}
