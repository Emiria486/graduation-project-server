export default class Admin {
    admin_id?: number;
    password: string;
    username: string;
    phone: string;
    avatar?: string;
    address: string;
    shop_name: string;
    email: string;
    constructor(password: string, username: string, phone: string, avatar: string, address: string, shop_name: string, email: string, admin_id?: number);
    get_admin_id(): number | undefined;
    set_admin_id(_admin_id: number): void;
    get_password(): string;
    set_password(_password: string): void;
    get_username(): string;
    set_username(_username: string): void;
    get_phone(): string;
    set_phone(_phone: string): void;
    get_avatar(): string;
    set_avatar(avatar?: string): void;
    get_address(): string;
    set_address(_address: string): void;
    get_shop_name(): string;
    set_shop_name(_shop_name: string): void;
    get_email(): string;
    set_email(_email: string): void;
}
