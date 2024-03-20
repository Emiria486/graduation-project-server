/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 11:25:40
 * @LastEditTime: 2024-03-20 11:48:30
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\FoodMenuService.ts
 * @Description: 菜单service的接口定义
 */
import Food from "../model/Food"
export default interface FoodMenuService {
  addFoodMenu(
    foods_id: number[],
    number: number,
    date: string
  ): Promise<boolean | any[]>
  deleteFoodMenu(food_menu_id: number): Promise<boolean>
  updateFoodMenuNum(number: number, food_menu_id: number): Promise<boolean>
  getFoodMenu(date: string): Promise<Food[] | boolean>
}
