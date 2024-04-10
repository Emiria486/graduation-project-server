import UserDao from '../UserDao';
import User from '../../model/User';
export default class UserDaoImpl implements UserDao {
    pool: import("mysql2/typings/mysql/lib/Pool").Pool;
    sql: string;
    sqlParams: Array<any>;
    /**
     * Description 根据指定用户名查找User
     * @param {any} UserName:string 指定用户名
     * @returns {any} User的promise
     */
    findByUserName(UserName: string): Promise<User>;
    /**
     * Description 根据用户id查找用户信息(已测试成功)
     * @param {any} UserId:number
     * @returns {any} user的promise
     */
    findByUserId(UserId: number): Promise<User>;
    /**
     * Description 根据userId来更新用户信息(已测试成功)
     * @param {any} UserId:number
     * @param {any} username:string 修改后的用户名
     * @param {any} phone:string  修改后的用户手机
     * @param {any} address:string 修改后的用户地址
     * @param {any} email:string    修改后的用户邮件
     * @returns {any} Boolean的promise
     */
    updateInfoByUserId(UserId: number, username: string, phone: string, address: string, email: string): Promise<boolean>;
    /**
     * Description 插入一个新用户(已测试成功)
     * @param {any} username:string 插入的新用户名
     * @param {any} password:string 插入的新密码
     * @param {any} email:string  插入的新邮箱
     * @param {any} phone:string  插入的新手机号
     * @returns {any} boolean的promise
     */
    insertOnce(username: string, password: string, email: string, phone: string): Promise<boolean>;
    /**
     * Description 通过用户id找到未解密的支付密码(已测试成功)
     * @param {any} UserId:number 用户id
     * @returns {any} 为解密的用户密码的字符串的promise
     */
    findPaymentPassByUserId(UserId: number): Promise<string>;
    /**
     * Description 通过用户id更新用户支付密码（已测试成功）
     * @param {any} UserId:number 用户id
     * @param {any} payment_password:string 更新后的支付密码
     * @returns {any} Boolean的promise
     */
    updatePaymentPass(UserId: number, payment_password: string): Promise<boolean>;
    /**
     * Description 根据用户id更新钱包余额(已测试成功)
     * @param {any} UserId:number 用户id
     * @param {any} price:number  钱包中的变化金额
     * @returns {any} Boolean的promise
     */
    updateWalletById(UserId: number, price: number): Promise<boolean>;
    /**
     * Description 根据用户id查找用户钱包金额(已测试成功)
     * @param {any} UserId:number 用户id
     * @returns {any} （金额）wallet：number的promise
     */
    findWalletById(UserId: number): Promise<number>;
}
