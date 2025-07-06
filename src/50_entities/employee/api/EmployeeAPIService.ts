import {BaseAPIService} from "@/60_shared/api";

import type {FilterEmployees} from "@/50_entities/employee/model";

class EmployeeAPIService extends BaseAPIService {
  // searchAddress = async (request: SearchAddressRequest) : Promise<SearchAddressResponce> => {
  //   return this.sendAndHandle(async () => {
  //       return (await instance.get('Fias/SearchAddress', { params: request })).data
  //     },
  //     {
  //       errorText: 'Ошибка при получении данных из ФИАС',
  //       errorNotification: true
  //     })
  // }
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
  ) => {
    return this.sendAndHandle(async () => {
        // return (await this.fetchios.fetch('Fias/SearchAddress', { params: request })).data
        return (await this.fetchios.fetch({
          method: "get",
          url: "employees",
          getParams: {
            page: page,
            per_page: perPage,
            position_ids: filter?.positionsIds ?? null,
            firstname: filter?.query.trim() ?? null,
          },
          abortSignal: abortSignal,
          }
        )).data
      },
      {
        errorText: 'Ошибка при получении данных из ФИАС',
        errorNotification: true
      })
  }
  // fetchPaginatedEmployees = async (
  //   {
  //     page = 1,
  //     perPage = 50,
  //     filter = null,
  //   }: {
  //     page?: number;
  //     perPage?: number;
  //     filter?: FilterEmployees | null;
  //   },
  //   { abortSignal }: { abortSignal?: AbortSignal } = {},
  // ) => {
  //   const dataFromServer = (await this.fetchios.fetch({
  //     method: "get",
  //     url: "employees",
  //     getParams: {
  //       page: page,
  //       per_page: perPage,
  //       position_ids: filter?.positionsIds ?? null,
  //       firstname: filter?.query.trim() ?? null,
  //     },
  //     abortSignal: abortSignal,
  //   })) as { data: IEmployee[]; total_count: number };
  // }
  
  // fetchPaginatedEmployees = async (
  //   {
  //     page = 1,
  //     perPage = 50,
  //     filter = null,
  //   }: {
  //     page?: number;
  //     perPage?: number;
  //     filter?: FilterEmployees | null;
  //   },
  //   { abortSignal }: { abortSignal?: AbortSignal } = {},
  // ) => {
  //   const dataFromServer = (await this.fetchios.fetch({
  //     method: "get",
  //     url: "employees",
  //     getParams: {
  //       page: page,
  //       per_page: perPage,
  //       position_ids: filter?.positionsIds ?? null,
  //       firstname: filter?.query.trim() ?? null,
  //     },
  //     abortSignal: abortSignal,
  //   })) as { data: IEmployee[]; total_count: number };
  // }
  
  
  // searchAddress = async (request: SearchAddressRequest) : Promise<SearchAddressResponce> => {
  //   return this.sendAndHandle(async () => {
  //       return (await instance.get('Fias/SearchAddress', { params: request })).data
  //     },
  //     {
  //       errorText: 'Ошибка при получении данных из ФИАС',
  //       errorNotification: true
  //     })
  // }

  // Не удалять. Он ещё 100% пригодится. Потому-что дублирующий сервис deprecated.
  // getAddress = async (request: GetFullAddressRequest): Promise<string> => {
  //   return this.sendAndHandle(async () => {
  //     return (await instance.get('Fias/getFullAddress', { params: request })).data
  //   }, {
  //     errorText: 'Ошибка при получении данных из ФИАС',
  //     errorNotification: true
  //   })
  // }

  // По сути - идентичны.
  // getFullAddressTree = async (id: string): Promise<GetFullAddressTreeResponce> => {
  //   return this.sendAndHandle(async () => {
  //     const params = { Id: id }
  //     return (await instance.get('Fias/getFullAddressTree', { params })).data
  //   }, {
  //     errorText: 'Ошибка при получении данных из ФИАС',
  //     errorNotification: true
  //   })
  // }
}

export {EmployeeAPIService}