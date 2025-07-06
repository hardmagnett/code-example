// @ts-nocheck
import { Model } from "pinia-orm";
import Position from "@/app/models/position/Position";
// @ts-ignore
class Employee extends Model {
  static entity = "employees";

  // @ts-ignore: Unreachable code error
  static fields() {
    // @ts-ignore: Unreachable code error
    return {
      id: this.uid(),
      firstname: this.string(""),
      lastname: this.string(""),
      position_id: this.attr(null),
      position: this.belongsTo(Position, "position_id"),
    };
  }
  // @ts-ignore: Unreachable code error
  declare id: number;
  declare firstname: string;
  declare lastname: string;
  declare position_id: number;
  declare position: Position | null;

  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}
export default Employee