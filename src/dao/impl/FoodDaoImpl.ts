import DBUtil from '../../utils/DBUtil'
import FoodDao from '../FoodDao'
import Food from '../../model/Food'
export default class FoodDaoImpl implements FoodDao {
  pool = DBUtil.createPoolConnection()
  sql: string = ''
  sqlParams: Array<any> = []
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
        else resolve(true)
      })
    })
  }
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
        if (err) reject(false)
        else resolve(true)
      })
    })
  }
  queryAll(): Promise<Food[]> {
    this.sql = 'select * from `food`'
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, (err: any, result: Food[]) => {
        if (err) reject(err)
        else {
          console.log('all foods:', result)
          resolve(result)
        }
      })
    })
  }
  deleteById(food_id: number): Promise<boolean> {
    this.sql = 'delete from `food` where `food_id`=?'
    this.sqlParams = [food_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err) => {
        if (err) reject(false)
        else resolve(true)
      })
    })
  }
  findById(food_id: number): Promise<Food> {
    this.sql = 'select * from `food` where `food_id` = ?'
    this.sqlParams=[food_id]
    return new Promise((resolve, reject) => {
      this.pool.execute(this.sql, this.sqlParams, (err, result: any[]) => {
        if (err) reject(err)
        else {
          console.log('id food', result[0])
          resolve(result[0] as Food)
        }
      })
    })
  }
}
