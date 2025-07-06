// import instance from '@/services/popup/apiInstance'
// import type {} from "@/50_entities/address";

import {BaseAPIService} from "@/60_shared/api";

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