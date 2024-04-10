import Food from '../model/Food';
export default interface FoodDao {
    addFood(food: Food): Promise<boolean>;
    updateFood(food: Food): Promise<boolean>;
    queryAll(): Promise<Food[]>;
    deleteById(isdelete: number, food_id: number): Promise<boolean>;
    findById(food_id: number): Promise<Food>;
}
