export default class OrderFood {
    order_id: number;
    food_id2: number;
    number: number;
    get_order_id(): number;
    set_order_id(_order_id: number): void;
    get_food_id2(): number;
    set_food_id2(_food_id2: number): void;
    get_number(): number;
    set_number(_number: number): void;
    constructor(food_id2: number, number: number, order_id?: number);
}
