export default class Food {
    food_id?: number;
    food_name: string;
    price: number;
    image: string;
    status: boolean;
    description: string;
    isdelete: number;
    get_isdelete(): number;
    set_isdelete(isdelete: number): void;
    get_food_id(): number | undefined;
    set_food_id(_food_id: number): void;
    get_food_name(): string;
    set_food_name(_food_name: string): void;
    get_price(): number;
    set_price(_price: number): void;
    get_image(): string;
    set_image(_image: string): void;
    get_status(): boolean;
    set_status(_status: boolean): void;
    get_description(): string;
    set_description(_description: string): void;
    constructor(food_name: string, price: number, image: string, status: boolean, description: string, isdelete: number, food_id?: number);
}
