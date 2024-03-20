/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-20 11:35:01
 * @LastEditTime: 2024-03-20 12:22:12
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\service\impl\FoodMenuServiceImpl.ts
 * @Description: 菜单service的实现类
 */
import FoodMenuService from '../FoodMenuService'
import FoodMenuDao from '../../dao/FoodMenuDao'
import FoodMenuDaoImpl from '../../dao/impl/FoodMenuDaoImpl'
import FoodMenu from '../../model/FoodMenu'
import FoodDao from '../../dao/FoodDao'
import FoodDaoImpl from '../../dao/impl/FoodDaoImpl'
import Food from '../../model/Food'

export default class FoodMenuServiceImpl implements FoodMenuService {
  private foodMenuDao: FoodMenuDao
  private foodDao: FoodDao
  constructor() {
    this.foodMenuDao = new FoodMenuDaoImpl()
    this.foodDao = new FoodDaoImpl()
  }

  /**
   * Description 添加菜品到菜单
   * @param {any} foods_id:number[] 菜品id数组
   * @param {any} number:number 菜品数量
   * @param {any} date:string  菜单所属周几
   * @returns {any} 是否添加成功
   */
  async addFoodMenu(
    foods_id: number[],
    number: number,
    date: string
  ): Promise<boolean | any[]> {
    const ids: any[] = foods_id.map((food_id) => {
      return this.foodMenuDao.addFoodMenu(food_id, number, date)
    })
    return await Promise.all(ids).catch(() => false)
  }
  /**
   * Description 删除指定id的菜单记录
   * @param {any} food_menu_id:number 指定菜单id
   * @returns {any} 是否删除
   */
  async deleteFoodMenu(food_menu_id: number): Promise<boolean> {
    return await this.foodMenuDao
      .deleteFoodMenuById(food_menu_id)
      .catch(() => false)
  }
  /**
   * Description 更新指定菜单中的菜品供应数量
   * @param {any} number:number 菜品数量
   * @param {any} food_menu_id:number 菜单id
   * @returns {any} 是否更新成功
   */
  async updateFoodMenuNum(
    number: number,
    food_menu_id: number
  ): Promise<boolean> {
    return await this.foodMenuDao
      .updateFoodMenuNumByFoodMenuId(number, food_menu_id)
      .catch(() => false)
  }
  /**
   * Description 找到指定周几的菜单所属的全部菜品数组
   * @param {any} date:string 指定周几
   * @returns {any} food[]：菜品数组或Boolean：查询失败
   */
  async getFoodMenu(date: string): Promise<boolean | Food[]> {
    // 查询到的特定日期菜单数组
    let foodMenu: FoodMenu[]
    //菜单数组中提取的全部菜品id数组
    let ids: number[] = []
    let foodsArr: Food[] = []
    try {
      foodMenu = await this.foodMenuDao.queryByDate(date)
      foodMenu.forEach((food) => {
        ids.push(food.get_food_id())
      })
      //去重,减少查询数据库次数
      ids = [...new Set(ids)]
      const promiseArr: any[] = ids.map((id) => this.foodDao.findById(id))
      foodsArr = await Promise.all(promiseArr)
      return foodsArr
    } catch (e) {
      return false
    }
  }
}
