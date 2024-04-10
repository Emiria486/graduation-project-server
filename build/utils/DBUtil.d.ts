import { PoolOptions } from 'mysql2';
declare class DBUtil {
    static access: PoolOptions;
    /**
     * Description 创建mysql2连接池，使用后不可以end()关闭，官方文档不推荐
     * @returns {any} 返回连接池对象
     */
    static createPoolConnection(): import("mysql2/typings/mysql/lib/Pool").Pool;
}
export default DBUtil;
