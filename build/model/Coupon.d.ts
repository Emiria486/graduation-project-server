export default class Coupon {
    coupon_id?: number;
    title: string;
    discount: number;
    limit: number;
    create_time: string;
    expirein: number;
    constructor(title: string, discount: number, limit: number, create_time: string, expirein: number, coupon_id?: number);
    get_coupon_id(): number | undefined;
    set_coupon_id(_coupon_id: number): void;
    get_title(): string;
    set_title(_title: string): void;
    get_discount(): number;
    set_discount(_discount: number): void;
    get_limit(): number;
    set_limit(_limit: number): void;
    get_create_time(): string;
    set_create_time(_create_time: string): void;
    get_expirein(): number;
    set_expirein(_expirein: number): void;
    toString(): string;
}
