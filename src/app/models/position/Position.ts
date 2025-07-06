import { Model } from "pinia-orm";
import { Str, Num } from "pinia-orm/decorators";
export default class Position extends Model {
  static entity = "positions";

  static fields(){
    return {
      id: this.uid(),
      title: this.string(''),
      // lastname: this.string(''),
      // position_id: this.attr(null),
      // position: this.belongsTo(Position, 'position_id')
    }
  }
  declare id: number
  declare title: string
  // declare lastname: string
  // declare position_id: string | null
  // declare position: Position | null
  
  // @Num(null) declare id: number;
  // @Str("") declare title: string;
}
