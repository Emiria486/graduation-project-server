import FoodDao from '../FoodDao';
import Food from '../../model/Food';
export default class FoodDaoImpl implements FoodDao {
    pool: import("mysql2/typings/mysql/lib/Pool").Pool;
    sql: string;
    sqlParams: Array<any>;
    /**
     * Description 添加菜品类(已测试成功)
     * @param {any} food:Food 菜品信息类
     * @returns {any}   boolean的promise
     */
    addFood(food: Food): Promise<boolean>;
    /**
     * Description 修改菜品信息(已测试成功)
     * @param {any} food:Food 菜品信息类
     * @returns {any} Boolean的promise
     */
    updateFood(food: Food): Promise<boolean>;
    /**
     * Description 查询所有菜品(已测试成功)
     * @returns {any} food[]的promise
     */
    queryAll(): Promise<Food[]>;
    /**
     * Description 根据菜品id删除菜品(已测试成功)
     * @param {any} food_id:number 菜品id
     * @returns {any} Boolean的promise
     */
    deleteById(isdelete: number, food_id: number): Promise<boolean>;
    /**
     * Description 指定菜品id查询相关菜品信息(已测试成功)
     * @param {any} food_id:number 指定菜品id
     * @returns {any} food的promise
     */
    findById(food_id: number): Promise<Food>;
}
