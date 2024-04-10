export default class UserController {
    private static instance;
    private userService;
    private couponService;
    private foodMenuService;
    private orderService;
    private adminService;
    constructor();
    static getInstance(): UserController;
    /**
     * Description 用于用户获取管理员信息
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getAdminInfo(req: any, res: any): Promise<void>;
    /**
     * Description 用户登录（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static login(req: any, res: any): Promise<void>;
    /**
     * Description 新用户注册（已测试成功）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static register(req: any, res: any): Promise<void>;
    /**
     * Description 获取用户信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getUserInfo(req: any, res: any): Promise<void>;
    /**
     * Description 更新用户信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static updateUserInfo(req: any, res: any): Promise<void>;
    /**
     * Description 获取周几的菜单（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getFoods(req: any, res: any): Promise<void>;
    /**
     * Description 找到有效期大于指定日期的优惠券（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getIssueCoupon(req: any, res: any): Promise<void>;
    /**
     * Description 查询用户所有可以优惠劵（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getUserCoupon(req: any, res: any): Promise<void>;
    /**
     * Description 用户登录指定id的优惠券（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static addCoupon(req: any, res: any): Promise<void>;
    /**
     * Description 确定用户支付密码是否存在(已测试通过)
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static isUserPaymentExist(req: any, res: any): Promise<void>;
    /**
     * Description 检验用户的支付密码是否正确（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static validatePaymentPass(req: any, res: any): Promise<void>;
    /**
     * Description 更新支付密码（已通过测试）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static updatePaymentPass(req: any, res: any): Promise<void>;
    /**
     * Description 获取所有的就餐方式选项（已通过测试）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getOrderType(req: any, res: any): Promise<void>;
    /**
     * Description 获取指定用户的全部订单（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getOrder(req: any, res: any): Promise<void>;
    /**
     * Description 更新用户的钱包余额(已测试通过)
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static updateUserWallet(req: any, res: any): Promise<void>;
}
