import { BaseAPIService } from "@/60_shared/api";
import type { Employee, FilterEmployees } from "@/50_entities/employee";

class EmployeeAPIService extends BaseAPIService {
  fetchPaginatedEmployees = async (
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
  ): Promise<{ data: Employee[] }> => {
    return this.sendAndHandle(
      async () => {
        return await this.fetchios.fetch({
          method: "get",
          url: "employees",
          getParams: {
            page: page,
            per_page: perPage,
            position_ids: filter?.positionsIds ?? null,
            firstname: filter?.query.trim() ?? null,
          },
          abortSignal: abortSignal,
        });
      },
      {
        errorText: "Ошибка при получении списка пользователей",
        errorNotification: true,
      },
    );
  };
}

export { EmployeeAPIService };
