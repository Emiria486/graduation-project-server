declare class JWTUtil {
    /**
     * Description 生成token字符串
     * @param {any} value:any 输入验证信息
     * @param {any} expires:number=60*60*24*30 过期时间默认30天过期
     * @returns {any} token字符串
     */
    static generate(value: any, expires?: number): string;
    /**
     * Description    校验token字符串
     * @param {any} token:string  token字符串
     * @returns {any} 正确就调用回调，错误就返回false
     */
    static verify(token: string): any;
}
export default JWTUtil;
