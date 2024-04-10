import User from '../model/User';
export default interface UserDao {
    findByUserId(UserId: number): Promise<User>;
    updateInfoByUserId(UserId: number, username: string, phone: string, address: string, email: string): Promise<boolean>;
    insertOnce(username: string, password: string, email: string, phone: string): Promise<boolean>;
    findPaymentPassByUserId(UserId: number): Promise<string>;
    updatePaymentPass(UserId: number, payment_password: string): Promise<boolean>;
    updateWalletById(UserId: number, price: number): Promise<boolean>;
    findWalletById(UserId: number): Promise<number>;
    findByUserName(UserName: string): Promise<User>;
}
