import type {App} from "vue";
import {ref} from "vue";
import createUUID from '@/a-library/helpers/language/string/createUUID';


// todo:: навести в этом файле порядок. А-то всё как-то через жопу.

interface Toast {
  id: string;
  type: string;
  message: string;
  autoClose: boolean;
  duration: number;
}

// todo:: упростить. Постараться избавиться от этого default options заменой на дефолтовые параметры CreateNotification
const defaultToastOptions = {
  type: "info",
  message: "Текст сообщения не указан",
  autoClose: true,
  duration: 5,
};


const toasts = ref<Toast[]>([])

const createToast: CreateToastFunctionDeclaration = (
  options
) => {
  const _options = Object.assign({ ...defaultToastOptions }, options);
  toasts.value.push({
    id: createUUID(),
    ..._options,
    // ...options,
  })
}

const removeToast = (id: string) => {
  const index = toasts.value.findIndex((item) => item.id === id);
  if (index !== -1) toasts.value.splice(index, 1);
};

type CreateToastFunctionDeclaration =
  (
    options: {
      type?: string;
      message?: string;
      autoClose?: boolean;
      duration?: number;
  })=> void

export type {
  Toast,
  CreateToastFunctionDeclaration
}
export {
  toasts,
  removeToast
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$toast = createToast
  },
};
