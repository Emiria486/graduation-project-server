/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 14:42:49
 * @LastEditTime: 2024-03-16 14:53:03
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\DBUtil.ts
 * @Description: 建立mysql连接函数
 */
import mysql from 'mysql2';
class DBUtil{
    public static createConnection(){
        return mysql.createConnection({
            host:"127.0.0.1",   //id地址
            user:"root",        //连接用户
            password:"123581lyj",   //登录密码
            database:"order_food",  // 使用的database名称
            charset:"utf8mb4"   //字符集
        })
    }
}
export default DBUtil