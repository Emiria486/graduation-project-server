/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 20:34:21
 * @LastEditTime: 2024-03-17 20:43:29
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\FoodDao.ts
 * @Description: 菜品类dao的定义接口
 */
import Food from '../model/Food'
export default interface FoodDao {
  addFood(food: Food): Promise<boolean>
  updateFood(food: Food): Promise<boolean>
  queryAll(): Promise<Food[]>
  deleteById(food_id: number): Promise<boolean>
  findById(food_id: number): Promise<Food>
}
