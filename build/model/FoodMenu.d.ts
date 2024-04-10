export default class FoodMenu {
    constructor(food_menu_id: number, food_id: number, number: number, date: string);
    food_menu_id: number;
    food_id: number;
    number: number;
    date: string;
    get_food_menu_id(): number;
    set_food_menu_id(_food_menu_id: number): void;
    get_food_id(): number;
    set_food_id(_food_id: number): void;
    get_number(): number;
    set_number(_number: number): void;
    get_date(): string;
    set_date(_date: string): void;
}
