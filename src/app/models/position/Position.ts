import { Model } from "pinia-orm";
// import { Str, Num } from "pinia-orm/decorators";
export default class Position extends Model {
  static entity = "positions";

  static fields() {
    return {
      id: this.uid(),
      title: this.string(""),
    };
  }
  declare id: number;
  declare title: string;
}
