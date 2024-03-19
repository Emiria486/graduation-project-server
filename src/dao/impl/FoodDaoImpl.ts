/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-17 20:43:49
 * @LastEditTime: 2024-03-19 15:47:51
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\dao\impl\FoodDaoImpl.ts
 * @Description: 菜品dao实现类
 */
import DBUtil from '../../utils/DBUtil'
import FoodDao from '../FoodDao'
import Food from '../../model/Food'
export default class FoodDaoImpl implements FoodDao {
  pool = DBUtil.createPoolConnection()
  sql: string = ''
  sqlParams: Array<any> = []
  /**
   * Description 添加菜品类(已测试成功)
   * @param {any} food:Food 菜品信息类
   * @returns {any}   boolean的promise
   */
  addFood(food: Food): Promise<boolean> {
    this.sql =
      'insert into `food`(`food_name`,`price`,`image`,`status`,`description`)values(?,?,?,?,?)'
    this.sqlParams = [
      food.get_food_name(),
      food.get_price(),
      food.get_image(),
      food.get_status(),
      food.get_description(),
    ]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else {
          console.log('addFood:成功')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 修改菜品信息(已测试成功)
   * @param {any} food:Food 菜品信息类
   * @returns {any} Boolean的promise
   */
  updateFood(food: Food): Promise<boolean> {
    this.sql =
      'update `food` set `food_name`=?,`price`=?,`image`=?,`status`=?,`description`=? where `food_id`=?'
    this.sqlParams = [
      food.get_food_name(),
      food.get_price(),
      food.get_image(),
      food.get_status(),
      food.get_description(),
      food.get_food_id(),
    ]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(err)
        else {
          console.log('updateFood:成功')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 查询所有菜品(已测试成功)
   * @returns {any} food[]的promise
   */
  queryAll(): Promise<Food[]> {
    this.sql = 'select * from `food`'
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, (err: any, result: Food[]) => {
        if (err) reject(err)
        else {
          console.log('queryAll foods:成功', result)
          resolve(result)
        }
      })
    })
  }
  /**
   * Description 根据菜品id删除菜品(已测试成功)
   * @param {any} food_id:number 菜品id
   * @returns {any} Boolean的promise
   */
  deleteById(food_id: number): Promise<boolean> {
    this.sql = 'delete from `food` where `food_id`=?'
    this.sqlParams = [food_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(err)
        else {
          console.log('deleteById:成功')
          resolve(true)
        }
      })
    })
  }
  /**
   * Description 指定菜品id查询相关菜品信息(已测试成功)
   * @param {any} food_id:number 指定菜品id
   * @returns {any} food的promise
   */
  findById(food_id: number): Promise<Food> {
    this.sql = 'select * from `food` where `food_id` = ?'
    this.sqlParams = [food_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('findById:成功', result[0])
          resolve(result[0] as Food)
        }
      })
    })
  }
}
