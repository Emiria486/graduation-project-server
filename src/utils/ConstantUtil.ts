/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 14:53:35
 * @LastEditTime: 2024-03-16 15:09:34
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\utils\ConstantUtil.ts
 * @Description: 服务器网络固定配置文件
 */
import path from "path";
import ip from 'ip'
 
class ConstantUtil{
    public static port:number=4396
    public static privateKey:string='liuyongjie'
    public static serverErrMsg:string='服务器开了小差，请稍后再试~'
    public static uploadAdminProfilePath:string=path.join(__dirname,'../upload/lyj/profile')
    public static uploadFoodImagePath:string=path.join(__dirname,'../upload/lyj/food')
    public static staticDir():string{
        return `https://${ip.address()}:${this.port}/static`
    }
}
export default ConstantUtil
