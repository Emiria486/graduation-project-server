```
server
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc.js
├─ nodejs-websocket.d.ts
├─ ormconfig.json
├─ package-lock.json
├─ package.json
├─ src
│  ├─ controller
│  │  ├─ AdminController.ts
│  │  └─ UserController.ts
│  ├─ dao
│  │  ├─ AdminDao.ts
│  │  ├─ CouponDao.ts
│  │  ├─ FoodDao.ts
│  │  ├─ FoodMenuDao.ts
│  │  ├─ impl
│  │  │  ├─ AdminDaoImpl.ts
│  │  │  ├─ CouponDaoImpl.ts
│  │  │  ├─ FoodDaoImpl.ts
│  │  │  ├─ FoodMenuDaoImpl.ts
│  │  │  ├─ OrderDaoImpl.ts
│  │  │  └─ UserDaoImpl.ts
│  │  ├─ OrderDao.ts
│  │  └─ UserDao.ts
│  ├─ enum
│  │  ├─ LoginEnum.ts
│  │  ├─ OrderStatusEnum.ts
│  │  ├─ OrderTypeEnum.ts
│  │  ├─ RegisterEnum.ts
│  │  ├─ UserMessageEnum.ts
│  │  └─ WeekEnum.ts
│  ├─ exceptions
│  │  ├─ AppError.ts
│  │  └─ ErrorHandler.ts
│  ├─ filter
│  │  ├─ Auth.ts
│  │  └─ UserAuth.ts
│  ├─ model
│  │  ├─ Admin.ts
│  │  ├─ Coupon.ts
│  │  ├─ Food.ts
│  │  ├─ FoodMenu.ts
│  │  ├─ Order.ts
│  │  ├─ OrderFood.ts
│  │  ├─ OrderType.ts
│  │  └─ User.ts
│  ├─ process.ts
│  ├─ router
│  │  ├─ adminRouter.ts
│  │  └─ userRouter.ts
│  ├─ server.ts
│  ├─ service
│  │  ├─ AdminService.ts
│  │  ├─ CouponService.ts
│  │  ├─ FoodMenuService.ts
│  │  ├─ FoodService.ts
│  │  ├─ impl
│  │  │  ├─ AdminServiceImpl.ts
│  │  │  ├─ CouponServiceImpl.ts
│  │  │  ├─ FoodMenuServiceImpl.ts
│  │  │  ├─ FoodServiceImpl.ts
│  │  │  ├─ OrderServiceImpl.ts
│  │  │  └─ UserServiceImpl.ts
│  │  ├─ OrderService.ts
│  │  └─ UserService.ts
│  ├─ socket
│  │  └─ OrderSocket.ts
│  ├─ upload
│  │  └─ lyj
│  │     ├─ food
│  │     └─ profile
│  └─ utils
│     ├─ AESHelper.ts
│     ├─ ConstantUtil.ts
│     ├─ DBUtil.ts
│     ├─ ErrorLogMiddleware.ts
│     ├─ FileUtil.ts
│     ├─ FormatUtil.ts
│     ├─ HttpUtil.ts
│     ├─ JWTUtil.ts
│     ├─ RequestLogMiddleware.ts
│     └─ SQSUtil.ts
└─ tsconfig.json

```