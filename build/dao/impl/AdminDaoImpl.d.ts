import AdminDao from '../AdminDao';
import Admin from '../../model/Admin';
declare class AdminDaoImpl implements AdminDao {
    pool: import("mysql2/typings/mysql/lib/Pool").Pool;
    sql: string;
    sqlParams: Array<any>;
    /**
     * Description 查询所有的管理员信息
     * @returns {any}
     */
    queryAllAdmin(): Promise<Admin[]>;
    /**
     * Description 根据管理员用户名找到对应管理员(已测试成功)
     * @param {any} username:string 管理员用户名
     * @returns {any} Admin类的promise
     */
    findByUsername(username: string): Promise<Admin>;
    /**
     * Description 按用户名更新用户信息表数据(已测试成功)
     * @param {any} admin:Admin 管理员更新后的信息
     * @returns {Boolean} Boolean的promise
     */
    updateInfoByUsername(admin: Admin): Promise<boolean>;
    /**
     * Description 根据用户名来更新密码(已测试成功)
     * @param {any} username:string 用户名
     * @param {any} password:string 更新后的用户密码
     * @returns {any} boolean的promise
     */
    updatePassByUsername(username: string, password: string): Promise<boolean>;
    /**
     * Description 根据用户名修改用户头像(已测试成功)
     * @param {any} username:string 用户名
     * @param {any} uploadPath:string 用户图片链接
     * @returns {any} Boolean的promise
     */
    updateAvatarByUsername(username: string, uploadPath: string): Promise<boolean>;
    /**
     * Description 找到第一个管理员（已测试成功）
     * @returns {any} admin的promise
     */
    findFirstOnce(): Promise<Admin>;
}
export default AdminDaoImpl;
