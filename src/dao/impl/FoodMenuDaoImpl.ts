import DBUtil from '../../utils/DBUtil'
import FoodMenu from '../../model/FoodMenu'
import FoodMenuDao from '../FoodMenuDao'
import WeekEnum from '../../enum/WeekEnum'
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
    throw new Error('Method not implemented.')
  }
  updateFoodMenuNumByFoodId(number: number, food_id: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  addFoodMenu(
    food_menu_id: number,
    food_id: number,
    number: number,
    date: string
  ): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  queryByDate(date: string): Promise<FoodMenu[]> {
    throw new Error('Method not implemented.')
  }
  findByFoodIdAndDate(food_id: number, date: string): Promise<FoodMenu> {
    throw new Error('Method not implemented.')
  }
}
