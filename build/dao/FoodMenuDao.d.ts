import FoodMenu from '../model/FoodMenu';
export default interface FoodMenuDao {
    deleteFoodMenuById(food_menu_id: number): Promise<boolean>;
    updateFoodMenuNumByFoodMenuId(number: number, food_menu_id: number): Promise<boolean>;
    updateFoodMenuNumByFoodId(number: number, food_id: number): Promise<boolean>;
    addFoodMenu(food_id: number, number: number, date: string): Promise<boolean>;
    queryByDate(date: string): Promise<FoodMenu[]>;
    findByFoodIdAndDate(food_id: number, date: string): Promise<FoodMenu>;
}
