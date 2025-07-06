// @ts-nocheck
import { Model } from "pinia-orm";
// @ts-ignore
class Position extends Model {
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

export default Position