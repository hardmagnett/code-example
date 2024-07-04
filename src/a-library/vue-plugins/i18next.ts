import type {App} from "vue";
import i18next from 'i18next';

export default {
  install: (app: App) => {
    i18next.init({
      lng: 'en', // if you're using a language detector, do not define the lng option
      // debug: true,
      debug: false,
      resources: {
        en: {
          translation: {
            validationRules: {
              // 'required': 'Введи, блин, хоть что-то',
              "required": "Поле '{{property}}' '{{fieldname}}' обязательное.",
              "minLength": "У поля '{{property}}' '{{fieldname}}' длина {{model}}. Минимальная длина {{min}}."
            },
            "key": "hello world"
          }
        }
      }
    });
    // app.config.globalProperties.$toast = createToast;
  },
};
