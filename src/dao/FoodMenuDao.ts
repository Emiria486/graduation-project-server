/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-18 20:12:19
 * @LastEditTime: 2024-03-18 20:48:23
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\FoodMenuDao.ts
 * @Description: 菜单类Dao接口定义
 */
import FoodMenu from '../model/FoodMenu'

export default interface FoodMenuDao {
  deleteFoodMenuById(food_menu_id: number): Promise<boolean>
  updateFoodMenuNumByFoodMenuId(
    number: number,
    food_menu_id: number
  ): Promise<boolean>
  updateFoodMenuNumByFoodId(number: number, food_id: number): Promise<boolean>
  addFoodMenu(
    food_menu_id: number,
    food_id: number,
    number: number,
    date: string
  ): Promise<boolean>
  queryByDate(date: string): Promise<FoodMenu[]>
  findByFoodIdAndDate(food_id: number, date: string): Promise<FoodMenu>
}
