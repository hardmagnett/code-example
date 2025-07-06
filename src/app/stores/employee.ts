import { defineStore } from "pinia";
import fetchiosInstance from "@/60_shared/api/fetchiosInstance";
import type { IEmployee } from "@/app/types/apiEntities";

import Employee from "@/app/models/employee/Employee";
import { useRepo } from "pinia-orm";
const employeeRepo = useRepo(Employee); // Если будет глючить - сделать его computed/getter. В примерах оно было computed/getter.

import type { AddEditFormData } from "@/app/components/employees/EmployeeDialogAddEdit/EmployeeDialogAddEdit.vue";
import { isEmployeePassesFilter } from "@/app/components/employees/EmployeesFilter/employeeFilterHelpers";
import type { FilterEmployees } from "@/50_entities/employee/model";

export const useEmployeesStore = defineStore("employeesStore", {
  state: () => ({
    paginatedEmployeeIds: [] as number[],
    // Сколько окажется, если паджинацию докрутить до конца.
    // Должна быть null в то время пока вообще ничего не загружено.
    totalPaginatedEmployeesQty: null as null | number,
  }),
  actions: {
    async fetchPaginatedEmployees(
      {
        page = 1,
        perPage = 50,
        filter = null,
      }: {
        page?: number;
        perPage?: number;
        filter?: FilterEmployees | null;
      },
      { abortSignal }: { abortSignal?: AbortSignal } = {},
    ) {
      const dataFromServer = (await fetchiosInstance.fetch({
        method: "get",
        url: "employees",
        getParams: {
          page: page,
          per_page: perPage,
          position_ids: filter?.positionsIds ?? null,
          firstname: filter?.query.trim() ?? null,
        },
        abortSignal: abortSignal,
      })) as { data: IEmployee[]; total_count: number };
      const fetchedEmployeesIds = dataFromServer.data.map((e) => e.id);
      this.paginatedEmployeeIds = [
        ...this.paginatedEmployeeIds,
        ...fetchedEmployeesIds,
      ];
      this.totalPaginatedEmployeesQty = dataFromServer.total_count;

      employeeRepo.save(dataFromServer.data);
    },
    clearPagination() {
      this.totalPaginatedEmployeesQty = null;
      this.paginatedEmployeeIds = [];
    },
    async deleteEmployee({ employeeId }: { employeeId: number }) {
      const dataFromServer = (await fetchiosInstance.fetch({
        method: "delete",
        url: `employees/${employeeId}`,
      })) as IEmployee;

      const deletedId = dataFromServer.id;
      const deletedEmployee = employeeRepo.destroy(deletedId);
      this.paginatedEmployeeIds = this.paginatedEmployeeIds.filter(
        (id) => id !== deletedId,
      );
      if (typeof this.totalPaginatedEmployeesQty === "number") {
        this.totalPaginatedEmployeesQty--;
      }
      return deletedEmployee;
    },
    async createEmployee({
      formData,
      filter,
    }: {
      formData: AddEditFormData;
      filter: FilterEmployees;
    }) {
      const dataFromServer = (await fetchiosInstance.fetch({
        method: "post",
        url: `employees/`,
        body: {
          firstname: formData.firstname,
          lastname: formData.lastname,
          position_id: formData.positionId,
        },
      })) as IEmployee;
      const createdEmployee = employeeRepo.save(dataFromServer);

      const needToAddToPagination = isEmployeePassesFilter(
        createdEmployee,
        filter,
      );
      if (needToAddToPagination) {
        this.paginatedEmployeeIds.unshift(createdEmployee.id);
        if (typeof this.totalPaginatedEmployeesQty === "number") {
          this.totalPaginatedEmployeesQty++;
        }
      }

      return createdEmployee;
    },
    async editEmployee({ formData }: { formData: AddEditFormData }) {
      const dataFromServer = (await fetchiosInstance.fetch({
        method: "put",
        url: `employees/${formData.id}`,
        body: {
          id: formData.id,
          firstname: formData.firstname,
          lastname: formData.lastname,
          position_id: formData.positionId,
        },
      })) as IEmployee;

      const updatedEmployee = employeeRepo.save(dataFromServer);

      return updatedEmployee;
    },
  },
  getters: {
    paginatedEmployees: (state) => {
      const employees = employeeRepo
        .query()
        .whereId(state.paginatedEmployeeIds)
        .with("position")
        .get();
      return employees;
    },
  },
});
