export type FilterEmployees = {
  query: string;
  positionsIds: number[];
};

export type Employee = {
  id: number;
  firstname: string;
  lastname: string;
};
