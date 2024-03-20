/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 15:49:51
 * @LastEditTime: 2024-03-20 15:55:51
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\FoodService.ts
 * @Description: 菜品service的接口定义
 */
import Food from '../model/Food'
export default interface FoodService {
  addFood(
    food_name: string,
    price: number,
    status: boolean,
    description: string,
    destination: string,
    path: string,
    filename: string
  ): Promise<boolean>
  updateFood(food: Food): Promise<boolean>
  getFoodData(): Promise<Food[] | boolean>
  deleteFood(food_id: number): Promise<boolean>
}
