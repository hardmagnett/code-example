import type {Employee} from "@/50_entities/employee";

export const getFullName = (employee: Employee): string => {
  return `${employee.firstname} ${employee.lastname}`;
}