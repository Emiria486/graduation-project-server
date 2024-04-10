export default class OrderType {
    order_type_id: number;
    order_type: string;
    get_order_type_id(): number;
    set_order_type_id(_order_type_id: number): void;
    get_order_type(): string;
    set_order_type(_order_type: string): void;
    constructor(order_type: string, order_type_id?: number);
}
