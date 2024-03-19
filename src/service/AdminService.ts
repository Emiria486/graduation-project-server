/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-19 16:33:46
 * @LastEditTime: 2024-03-19 19:06:57
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\AdminService.ts
 * @Description: 管理员service的定义接口
 */
import LoginEnum from '../enum/LoginEnum'
import Admin from '../model/Admin'
import Food from '../model/Food'
export default interface AdminService {
  login(username: string, password: string): Promise<LoginEnum | string>
  getAdminInfo(username: string): Promise<Admin | string>
  updateAdminInfo(admin: Admin): Promise<boolean>
  updateAdminAvatar(
    originalname: string,
    destination: string,
    path: string,
    username: string
  ): Promise<boolean>
  //   getAccountFlow(date: string): Promise<any>
  //   getUserFlow(date: string): Promise<any>
  validatePass(username: string, password: string): Promise<boolean>
  updatePass(username: string, password: string): Promise<boolean>
  addNewFood(food: Food): Promise<boolean>
}
