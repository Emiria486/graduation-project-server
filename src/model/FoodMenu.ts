
export default class FoodMenu {
  constructor(
    food_menu_id: number,
    food_id: number,
    number: number,
    date: string
  ) {
    this.food_menu_id = food_menu_id
    this.food_id = food_id
    this.number = number
    this.date = date
  }
   food_menu_id: number
   food_id: number
   number: number
   date: string

  public get_food_menu_id(): number {
    return this.food_menu_id
  }

  public set_food_menu_id(_food_menu_id: number): void {
    this.food_menu_id = _food_menu_id
  }

  public get_food_id(): number {
    return this.food_id
  }

  public set_food_id(_food_id: number): void {
    this.food_id = _food_id
  }

  public get_number(): number {
    return this.number
  }

  public set_number(_number: number): void {
    this.number = _number
  }

  public get_date(): string {
    return this.date
  }

  public set_date(_date: string): void {
    this.date = _date
  }
}
