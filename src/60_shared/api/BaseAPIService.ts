import fetchios from "./fetchiosInstance";
import Fetchios from "./Fetchios";

class BaseAPIService {
  fetchios: Fetchios
  constructor() {
    this.fetchios = fetchios
    // Здесь можно получить токен и записать его в экземпляр http-клиента.
  }
  
  /**
   *
   * @param callback
   * @param errorText - дополнительный текст для ошибки
   * @param errorNotification - если true, то выведет ошибку в toast-нотификации.
   * @protected
   */
  protected sendAndHandle<T>(
    callback: () => T,
    {errorText, errorNotification}: {errorText?: string, errorNotification?: boolean} = {}
  ): T | null {
    let result: T | null = null
    try {
      result = callback()
    } catch (error) {
      console.error(error)
      if (errorText) console.error(errorText)
      if (errorText && errorNotification) {
        console.error('В этом месте можно выводить ошибку например в toast-notification. Но пока-что это не реализовано.')
      }
      result = null
    }
    return result
  }
}

export {BaseAPIService}