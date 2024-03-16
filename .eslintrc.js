/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 11:42:53
 * @LastEditTime: 2024-03-16 11:43:23
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\.eslintrc.js
 * @Description: 头部注释配置模板
 */
module.exports = {
    root: true,
    // 扩展规则
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    // 注册插件
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'no-var': 'error',
        'no-undef': 0,
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    },
}