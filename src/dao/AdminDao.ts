/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 09:21:35
 * @LastEditTime: 2024-03-17 09:35:23
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\AdminDao.ts
 * @Description: 管理员的dao定义接口
 */
import Admin from '../model/Admin'
interface AdminDao {
  findByUsername(username: string): Promise<Admin>
  findFirstOnce(): Promise<Admin>
  updateInfoByUsername(admin: Admin): Promise<boolean>
  updatePassByUsername(username: string, password: string): Promise<boolean>
  updateAvatarByUsername(username: string, uploadPath: string): Promise<boolean>
  queryAllAdmin(): Promise<Admin[]>
}
export default AdminDao
