export default class User {
    user_id?: number;
    username: string;
    password: string;
    address: string;
    avatar: string;
    wallet: number;
    payment_password: string;
    email: string;
    phone: string;
    constructor(username: string, password: string, address: string, avatar: string, wallet: number, payment_password: string, email: string, phone: string, user_id?: number);
    get_user_id(): number | undefined;
    set_user_id(_user_id: number): void;
    get_username(): string;
    set_username(_username: string): void;
    get_password(): string;
    set_password(_password: string): void;
    get_address(): string;
    set_address(_address: string): void;
    get_avatar(): string;
    set_avatar(_avatar: string): void;
    getWallet(): number;
    setWallet(wallet: number): void;
    get_payment_password(): string;
    set_payment_password(_payment_password: string): void;
    get_email(): string;
    set_email(_email: string): void;
    get_phone(): string;
    set_phone(_phone: string): void;
}
