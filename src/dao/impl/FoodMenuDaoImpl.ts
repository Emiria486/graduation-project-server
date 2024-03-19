/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-18 20:49:33
 * @LastEditTime: 2024-03-19 09:20:53
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
  deleteFoodMenuById(food_menu_id: number): Promise<boolean> {
    this.sql = 'delete from `food_menu` where `food_menu_id`=?'
    this.sqlParams = [food_menu_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(err)
        else {
          console.log('删除菜单成功')
          resolve(true)
        }
      })
    })
  }
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
          console.log('更新菜单成功')
          resolve(true)
        }
      })
    })
  }
  updateFoodMenuNumByFoodId(number: number, food_id: number): Promise<boolean> {
    this.sql = 'update `food_menu` set `number` =? where `food_id`=?'
    this.sqlParams = [number, food_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else {
          console.log('更新菜单成功')
          resolve(true)
        }
      })
    })
  }
  addFoodMenu(food_id: number, number: number, date: string): Promise<boolean> {
    this.sql =
      'insert into `food_menu`(`food_id`, `number`, `date`) values (?, ?, ?, ?)'
    this.sqlParams = [food_id, number, date]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else {
          console.log('添加菜单成功')
          resolve(true)
        }
      })
    })
  }
  queryByDate(date: string): Promise<FoodMenu[]> {
    this.sql = 'select * from `food_menu` where `date`=?'
    this.sqlParams = [date]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result) => {
        if (err) reject(err)
        else {
          console.log(`${date}这天的菜单`, result)
          resolve(result as FoodMenu[])
        }
      })
    })
  }
  findByFoodIdAndDate(food_id: number, date: string): Promise<FoodMenu> {
    this.sql = 'select * from `food_menu` where `food_id` =? and `date` = ?'
    this.sqlParams = [food_id, date]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('findByFoodIdAndDate', result)
          resolve(result[0] as FoodMenu)
        }
      })
    })
  }
}
