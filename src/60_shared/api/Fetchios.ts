/**
 * @baseUrl например 'https://ya.ru/' или '/api'
 */
type ConstructorParams = {
  baseUrl?: string;
};

type GetParams = Record<string, string | number | string[] | number[] | null>;
const convertObjectForURLSearchParams = (
  getParams: GetParams,
): Record<string, string> => {
  const convertedParams: Record<string, string> = {};
  for (const key in getParams) {
    if (Object.prototype.hasOwnProperty.call(getParams, key)) {
      const resultingKey = key.toString();
      const val = getParams[key];
      let needToSkip = false;
      let resultingVal: string = "";
      if (val === null) {
        needToSkip = true;
      } else if (typeof val === "number") {
        resultingVal = val.toString();
      } else if (Array.isArray(val)) {
        if (val.length) {
          resultingVal = val.join(",");
        } else {
          needToSkip = true;
        }
      } else {
        if (!val) {
          needToSkip = true;
        } else {
          resultingVal = val.toString();
        }
      }
      if (!needToSkip) {
        convertedParams[resultingKey] = resultingVal;
      }
    }
  }
  return convertedParams;
};

type FetchParams = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  getParams?: GetParams;
  abortSignal?: AbortSignal;
  body?: Object;
};

/**
 * Моя собственная реализация чего-то похожего на Axios.
 */
class Fetchios {
  private readonly baseUrl: string;
  constructor({ baseUrl = "" }: ConstructorParams = { baseUrl: "" }) {
    this.baseUrl = baseUrl;
  }
  private _prepareUrl({
    url,
    getParams,
  }: {
    url: string;
    getParams: GetParams;
  }) {
    let finalUrl = this.baseUrl + url;
    const convertedGetParams = convertObjectForURLSearchParams(getParams);
    const searchParamsString = new URLSearchParams(
      convertedGetParams,
    ).toString();
    if (searchParamsString) {
      finalUrl = finalUrl + "?" + searchParamsString;
    }
    return finalUrl;
  }
  // todo:: линтнер на этот any не ругается. Может дело в JS-овском методе fetch?
  //  Нужно проверить дать any в другом месте, и возможно поправить правило линта.
  // Запрос на сервер может вернуть любой тип данных
  fetch({ url, method, getParams = {}, abortSignal, body }: FetchParams): any {
    return new Promise((resolve, reject) => {
      const finalUrl = this._prepareUrl({ url, getParams });

      fetch(finalUrl, {
        method: method,
        signal: abortSignal,
        body: JSON.stringify(body),
      })
        .then(function (res) {
          if (!res.ok) {
            // Если код не 2xx
            throw new Error(`HTTP ошибка! status: ${res.status}`);
          } else {
            return res.json();
          }
        })
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          // Сюда попадают только сетевые ошибки (Офлайн, ошибки DNS, сети, AbortError и т.п.). Например, net::ERR_FAILED.
          reject(err);
        });
    });
  }
}

export default Fetchios;
