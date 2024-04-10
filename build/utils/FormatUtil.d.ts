declare class FormatUtil {
    /**
     * Description 返回格式化日期函数
     * @param {any} time:string|number 时间字符串或时间戳
     * @returns {any} 返回'yyyy-mm-dd hour:minute:second'格式字符串
     */
    static dateFormat(time: string | number): string;
}
export default FormatUtil;
