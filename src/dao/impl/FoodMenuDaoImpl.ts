/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-18 20:49:33
 * @LastEditTime: 2024-03-19 09:47:49
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\impl\FoodMenuDaoImpl.ts
 * @Description: 菜单类的dao实现类
 */
import DBUtil from '../../utils/DBUtil'
import FoodMenu from '../../model/FoodMenu'
import FoodMenuDao from '../FoodMenuDao'
export default class FoodMenuDaoImpl implements FoodMenuDao {
  pool = DBUtil.createPoolConnection()
  sql: string = ''
  sqlParams: Array<any> = []
  /**
   * Description 根据菜单id删除对应的记录(已测试成功)
   * @param {any} food_menu_id:number 菜单id
   * @returns {any} 是否添加成功的promise
   */
  deleteFoodMenuById(food_menu_id: number): Promise<boolean> {
    this.sql = 'delete from `food_menu` where `food_menu_id`=?'
    this.sqlParams = [food_menu_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(err)
        else {
          console.log('删除菜单成功:deleteFoodMenuById')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 根据food_menu_id来更新菜单菜品供应数量(已测试成功)
   * @param {any} number:number 菜品供应数量
   * @param {any} food_menu_id:number 菜单id
   * @returns {any} 是否添加成功的promise
   */
  updateFoodMenuNumByFoodMenuId(
    number: number,
    food_menu_id: number
  ): Promise<boolean> {
    this.sql = 'update `food_menu` set `number` =? where `food_menu_id`=?'
    this.sqlParams = [number, food_menu_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else {
          console.log('更新菜单成功:updateFoodMenuNumByFoodMenuId')
          resolve(true)
        }
      })
    })
  }

  /**
   * Description 根据food_id来更新菜单菜品供应数量(测试成功)
   * @param {any} number:number 菜品供应量
   * @param {any} food_id:number
   * @returns {any} 是否添加成功的promise
   */
  updateFoodMenuNumByFoodId(number: number, food_id: number): Promise<boolean> {
    this.sql = 'update `food_menu` set `number` =? where `food_id`=?'
    this.sqlParams = [number, food_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else {
          console.log('更新菜单成功:updateFoodMenuNumByFoodId')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 添加菜单（已测试成功）
   * @param {any} food_id:number 菜品id
   * @param {any} number:number  菜品供应数量
   * @param {any} date:string    属于周几的菜单
   * @returns {boolean}  是否添加成功的promise
   */
  addFoodMenu(food_id: number, number: number, date: string): Promise<boolean> {
    this.sql =
      'insert into `food_menu`(`food_id`, `number`, `date`) values (?, ?, ?)'
    this.sqlParams = [food_id, number, date]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else {
          console.log('添加菜单成功:addFoodMenu')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 按周几搜索符合周几的全部菜单 （已测试成功）
   * @param {any} date:string 周几，默认为周一
   * @returns {any} FoodMenu[]的promise
   */
  queryByDate(date: string): Promise<FoodMenu[]> {
    this.sql = 'select * from `food_menu` where `date`=?'
    this.sqlParams = [date]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result) => {
        if (err) reject(err)
        else {
          console.log(`${date}这天的菜单:queryByDate`, result)
          resolve(result as FoodMenu[])
        }
      })
    })
  }
  /**
   * Description 按照周几和food_id搜索符合条件的全部菜单（已测试成功）
   * @param {any} food_id:number
   * @param {any} date:string
   * @returns {any} foodMenu的promise
   */
  findByFoodIdAndDate(food_id: number, date: string): Promise<FoodMenu> {
    this.sql = 'select * from `food_menu` where `food_id` =? and `date` = ?'
    this.sqlParams = [food_id, date]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('findByFoodIdAndDate成功', result)
          resolve(result[0] as FoodMenu)
        }
      })
    })
  }
}
