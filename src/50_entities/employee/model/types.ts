import type {Position} from "@/50_entities/position";

export type FilterEmployees = {
  query: string;
  positionsIds: number[];
};

export type Employee = {
  id: number;
  firstname: string;
  lastname: string;
  position_id?: number;
  position?: Position;
};
