import AdminService from '../AdminService';
import Admin from '../../model/Admin';
import Food from '../../model/Food';
export default class AdminServiceImpl implements AdminService {
    private adminDao;
    private foodDao;
    constructor();
    findAllAdmin(): Promise<Admin[]>;
    /**
     * Description 管理员登录
     * @param {any} username:string 用户名登录
     * @param {any} password:string 客户端使用AES加密后的密码字符串
     * @returns {string} 生成token字符串
     */
    login(username: string, password: string): Promise<string>;
    /**
     * Description 根据指定用户名得到管理员信息
     * @param {any} username:string 指定用户名
     * @returns {admin} 管理员信息或错误提示字符串
     */
    getAdminInfo(username: string): Promise<Admin | string>;
    /**
     * Description 更新管理员信息
     * @param {any} admin:Admin 更新后的管理员对象
     * @returns {any} Boolean的promise
     */
    updateAdminInfo(admin: Admin): Promise<boolean>;
    /**
     * Description 更新管理员头像（已测试通过）
     * @param {any} originalname:string  文件名
     * @param {any} destination:string 存储路径
     * @param {any} path:string 原来的图片路径
     * @param {any} username:string 管理员用户名
     * @returns {any} boolean
     */
    updateAdminAvatar(originalname: string, destination: string, path: string, username: string): Promise<boolean>;
    /**
     * Description 校验用户输入的密码是否正确
     * @param {any} username:string 输入的用户名
     * @param {any} password:string 输入的客户端加密后的用户密码
     * @returns {any} Boolean的promise
     */
    validatePass(username: string, password: string): Promise<boolean>;
    /**
     * Description 更新管理员登录密码
     * @param {any} username:string 用户名
     * @param {any} password:string 客户端加密后的密码字符串
     * @returns {any}
     */
    updatePass(username: string, password: string): Promise<boolean>;
    /**
     * Description 管理员添加新菜品（不可用，应该使用FoodService的addFood!!!）
     * @param {any} food:Food
     * @returns {any}
     */
    addNewFood(food: Food): Promise<boolean>;
    /**
     * Description 测试AWS环境变量
     * @returns {any}
     */
    envTest(): void;
}
