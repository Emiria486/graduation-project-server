import FoodMenuService from '../FoodMenuService';
export default class FoodMenuServiceImpl implements FoodMenuService {
    private foodMenuDao;
    private foodDao;
    constructor();
    /**
     * Description 添加菜品到菜单
     * @param {any} foods_id:number[] 菜品id数组
     * @param {any} number:number 菜品数量
     * @param {any} date:string  菜单所属周几
     * @returns {any} 是否添加成功
     */
    addFoodMenu(foods_id: number[], number: number, date: string): Promise<boolean | any[]>;
    /**
     * Description 删除指定id的菜单记录
     * @param {any} food_menu_id:number 指定菜单id
     * @returns {any} 是否删除
     */
    deleteFoodMenu(food_menu_id: number): Promise<boolean>;
    /**
     * Description 更新指定菜单中的菜品供应数量
     * @param {any} number:number 菜品数量
     * @param {any} food_menu_id:number 菜单id
     * @returns {any} 是否更新成功
     */
    updateFoodMenuNum(number: number, food_menu_id: number): Promise<boolean>;
    /**
     * Description 找到指定周几的菜单所属的全部菜品数组
     * @param {any} date:string 指定周几
     * @returns {any} food[]：菜品数组或Boolean：查询失败
     */
    getFoodMenu(date: string): Promise<any[] | boolean>;
}
