import FoodMenu from '../../model/FoodMenu';
import FoodMenuDao from '../FoodMenuDao';
export default class FoodMenuDaoImpl implements FoodMenuDao {
    pool: import("mysql2/typings/mysql/lib/Pool").Pool;
    sql: string;
    sqlParams: Array<any>;
    /**
     * Description 根据菜单id删除对应的记录(已测试成功)
     * @param {any} food_menu_id:number 菜单id
     * @returns {any} 是否添加成功的promise
     */
    deleteFoodMenuById(food_menu_id: number): Promise<boolean>;
    /**
     * Description 根据food_menu_id来更新菜单菜品供应数量(已测试成功)
     * @param {any} number:number 菜品供应数量
     * @param {any} food_menu_id:number 菜单id
     * @returns {any} 是否添加成功的promise
     */
    updateFoodMenuNumByFoodMenuId(number: number, food_menu_id: number): Promise<boolean>;
    /**
     * Description 根据food_id来更新菜单菜品供应数量(测试成功)
     * @param {any} number:number 菜品供应量
     * @param {any} food_id:number
     * @returns {any} 是否添加成功的promise
     */
    updateFoodMenuNumByFoodId(number: number, food_id: number): Promise<boolean>;
    /**
     * Description 添加菜单（已测试成功）
     * @param {any} food_id:number 菜品id
     * @param {any} number:number  菜品供应数量
     * @param {any} date:string    属于周几的菜单
     * @returns {boolean}  是否添加成功的promise
     */
    addFoodMenu(food_id: number, number: number, date: string): Promise<boolean>;
    /**
     * Description 按周几搜索符合周几的全部菜单 （已测试成功）
     * @param {any} date:string 周几，默认为周一
     * @returns {any} FoodMenu[]的promise
     */
    queryByDate(date: string): Promise<FoodMenu[]>;
    /**
     * Description 按照周几和food_id搜索符合条件的全部菜单（已测试成功）
     * @param {any} food_id:number
     * @param {any} date:string
     * @returns {any} foodMenu的promise
     */
    findByFoodIdAndDate(food_id: number, date: string): Promise<FoodMenu>;
}
