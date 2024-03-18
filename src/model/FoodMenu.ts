/*
 * @Author: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @Date: 2024-03-16 23:03:05
 * @LastEditTime: 2024-03-18 20:14:13
 * @LastEditors: Emiria486 87558503+Emiria486@users.noreply.github.com
 * @FilePath: \server\src\model\FoodMenu.ts
 * @Description: 菜单实体类
 */
export default class FoodMenu {
  constructor(
    food_menu_id: number,
    food_id: number,
    number: number,
    date: string
  ) {
    this._food_menu_id = food_menu_id
    this._food_id = food_id
    this._number = number
    this._date = date
  }
  private _food_menu_id: number
  private _food_id: number
  private _number: number
  private _date: string

  public get_food_menu_id(): number {
    return this._food_menu_id
  }

  public set_food_menu_id(_food_menu_id: number): void {
    this._food_menu_id = _food_menu_id
  }

  public get_food_id(): number {
    return this._food_id
  }

  public set_food_id(_food_id: number): void {
    this._food_id = _food_id
  }

  public get_number(): number {
    return this._number
  }

  public set_number(_number: number): void {
    this._number = _number
  }

  public get_date(): string {
    return this._date
  }

  public set_date(_date: string): void {
    this._date = _date
  }
}
