import { BaseAPIService } from "@/60_shared/api";
import type { Employee, FilterEmployees } from "@/50_entities/employee";
import fetchiosInstance from "@/60_shared/api/fetchiosInstance.ts";
// import type {IPosition} from "@/app/types/apiEntities.ts";
import type {Position} from "@/50_entities/position";

class PositionAPIService extends BaseAPIService {
  fetchAllPositions = async (): Promise<{ data: Position[] }> => {
    return this.sendAndHandle(
      async () => {
        return await this.fetchios.fetch({
          method: "get",
          url: "positions",
        });
      },
      {
        errorText: "Ошибка при получении списка должностей",
      },
    );
  };
}
export { PositionAPIService };
