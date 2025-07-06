import { Model } from "pinia-orm";
import { BelongsTo, Str, Uid, Num } from "pinia-orm/decorators";
import Position from "@/app/models/position/Position";
export default class Employee extends Model {
  static entity = "employees";
  
  static fields(){
    return {
      id: this.uid(),
      firstname: this.string(''),
      lastname: this.string(''),
      position_id: this.attr(null),
      position: this.belongsTo(Position, 'position_id')
    }
  }
  declare id: number
  declare firstname: string
  declare lastname: string
  // declare position_id: number | null
  declare position_id: number
  declare position: Position | null
  
  // @Uid() declare id: number;
  //
  // @Str("") declare firstname: string;
  // @Str("") declare lastname: string;
  //
  // @Num(null) declare position_id: number;
  //
  // @BelongsTo(() => Position, "position_id") declare position: Position | null;

  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}
