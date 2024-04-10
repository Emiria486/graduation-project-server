export default class AdminController {
    private static instance;
    private adminService;
    private couponService;
    private foodService;
    private foodMenuService;
    private orderService;
    private userService;
    private constructor();
    static getInstance(): AdminController;
    /**
     * Description 用户登录（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static adminLogin(req: any, res: any): Promise<void>;
    /**
     * Description 获取管理员用户信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getAdminInfo(req: any, res: any): Promise<void>;
    /**
     * Description 验证密码是否正确，（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static validatePass(req: any, res: any): Promise<void>;
    /**
     * Description 更新管理员头像（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static updateAvatar(req: any, res: any): Promise<void>;
    /**
     * Description 更新管理员密码（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static updatePass(req: any, res: any): Promise<void>;
    /**
     * Description 管理员新增优惠券（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static issueCoupon(req: any, res: any): Promise<void>;
    /**
     * Description 获取所有的菜品信息，（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getFood(req: any, res: any): Promise<void>;
    /**
     * Description 更新管理员信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static updateAdminInfo(req: any, res: any): Promise<void>;
    /**
     * Description 上传菜品的全部信息，包括图片(已测试通过)
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static addFood(req: any, res: any): Promise<void>;
    /**
     * Description 删除指定id的菜品（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static deleteFood(req: any, res: any): Promise<void>;
    /**
     * Description 更新菜品信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static updateFood(req: any, res: any): Promise<void>;
    /**
     * Description 获取周几的菜单详细信息（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getFoodMenu(req: any, res: any): Promise<void>;
    /**
     * Description 将菜品数组添加到指定日期的菜单中（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static addFoodMenu(req: any, res: any): Promise<void>;
    /**
     * Description 修改菜单菜品供应数量（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static updateFoodMenuNum(req: any, res: any): Promise<void>;
    /**
     * Description 删除指定id的菜单条目（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static deleteFoodMenu(req: any, res: any): Promise<void>;
    /**
     * Description 获取所有未处理的订单，（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getOutstandingOrder(req: any, res: any): Promise<void>;
    /**
     * Description 分页查询订单（已测试通过）
     * @param {any} req:any
     * @param {any} res:any
     * @returns {any}
     */
    static getOrders(req: any, res: any): Promise<void>;
}
