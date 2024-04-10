declare class FileUtil {
    /**
     * Description 返回（xxx.jpg）时间戳命名的字符串函数
     * @returns {string}
     */
    static fileName(): string;
    static orderId(type: string): string;
}
export default FileUtil;
