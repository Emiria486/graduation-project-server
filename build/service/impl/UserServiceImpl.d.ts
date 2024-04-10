import UserService from '../UserService';
import LoginEnum from '../../enum/LoginEnum';
import User from '../../model/User';
import RegisterEnum from '../../enum/RegisterEnum';
export default class UserServiceImpl implements UserService {
    private UserDao;
    constructor();
    /**
     * Description 登录函数 (已测试通过)
     * @param {any} username:string 用户名
     * @param {any} password:string 用户密码
     * @returns {any} LoginEnum：提示字符串 | string token
     */
    login(username: string, password: string): Promise<LoginEnum | string>;
    /**
     * Description
     * @param {any} username:string 用户名
     * @param {any} password:string 注册密码
     * @param {any} email:string    邮箱
     * @param {any} phone:string  手机号
     * @returns {any} RegisterEnum：登录提示字符串
     */
    register(username: string, password: string, email: string, phone: string): Promise<RegisterEnum>;
    /**
     * Description 更新指定id的用户信息
     * @param {any} userId:number 用户id
     * @param {any} username:string 用户名
     * @param {any} phone:string 手机号
     * @param {any} address:string 地址
     * @param {any} email:string 邮箱
     * @returns {any} 是否更新成功
     */
    updateUserInfo(userId: number, username: string, phone: string, address: string, email: string): Promise<boolean>;
    /**
     * Description 获取指定id的用户信息
     * @param {any} userId:number 指定id
     * @returns {any} User：用户信息 null：查询为空
     */
    getUserInfo(userId: number): Promise<User | null>;
    /**
     * Description 获得指定id的支付密码
     * @param {any} userId:number 指定id
     * @returns {any} 加密后的支付密码字符串
     */
    getPaymentPass(userId: number): Promise<string | boolean>;
    /**
     * Description 更新指定id的用户支付密码
     * @param {any} userId:number 指定id
     * @param {any} payment_password:string 客户端加密后的支付密码
     * @returns {any} 是否更新成功
     */
    updatePaymentPass(userId: number, payment_password: string): Promise<boolean>;
    /**
     * Description 校验支付密码是否正确
     * @param {any} userId:number 用户id
     * @param {any} payment_password:string 客户端加密后的支付密码
     * @returns {any}
     */
    validatePaymentPass(userId: number, payment_password: string): Promise<boolean>;
    /**
     * Description 更新用户钱包余额
     * @param {any} userId:number 指定id
     * @param {any} price:number 扣除金额
     * @returns {any} 是否更新成功
     */
    updateUserWallet(userId: number, price: number): Promise<boolean>;
    /**
     * Description 找到指定id的用户钱包余额
     * @param {any} userId:number 指定id
     * @returns {any} 钱包余额或查询失败
     */
    findUserWallet(userId: number): Promise<number | boolean>;
}
