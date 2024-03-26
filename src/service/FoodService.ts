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
  /**
   * Description 向food表添加新菜品
   * @param {any} food_name:string 菜品名称
   * @param {any} price:number  菜品单价
   * @param {any} status:boolean 是否销售
   * @param {any} description:string 菜品描述
   * @param {any} destination:string
   * @param {any} path:string
   * @param {any} filename:string 文件名
   * @returns {any} 是否添加成功
   */
  addFood(
    food_name: string,
    price: number,
    status: boolean,
    description: string,
    isdelete: number,
    destination: string,
    path: string,
    filename: string
  ): Promise<boolean>
  /**
   * Description 更新菜品信息
   * @param {any} food:Food 更新后的菜品信息类
   * @returns {any} 是否修改成功
   */
  updateFood(food: Food): Promise<boolean>
  /**
   * Description 获取所有菜品信息
   * @returns {any}  Food[]：菜品数组或Boolean查询失败
   */
  getFoodData(): Promise<Food[] | boolean>
  /**
   * Description 删除指定id的菜品
   * @param {any} food_id:number 菜品id
   * @returns {any} 是否删除
   */
  deleteFood(isdelete:number,food_id: number): Promise<boolean>
}
