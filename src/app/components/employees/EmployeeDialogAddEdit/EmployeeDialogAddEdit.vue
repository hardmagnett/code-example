<script setup lang="ts">
import { computed, reactive, watch } from "vue";

import { iDialogablePropDefaults } from "@/app/component-interfaces/IDialogable";
import type { IDialogableProps } from "@/app/component-interfaces/IDialogable";
import { required } from "@/a-library/third-party/vuelidate/i18n-validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

import { storeToRefs } from "pinia";
import { usePositionsStore } from "@/app/stores/position";
import type {Employee} from "@/50_entities/employee";
const positionsStore = usePositionsStore();
const { allPositions } = storeToRefs(positionsStore);

const emit = defineEmits<{
  needToClose: [];
  apply: [eventData: AddEditFormData];
}>();

export interface Props extends IDialogableProps {
  employee: Employee | null;
}
const props = withDefaults(defineProps<Props>(), {
  employee: null,
  ...iDialogablePropDefaults,
});

export type AddEditFormData = {
  id?: number | null;
  firstname: string;
  lastname: string;
  positionId: number | null;
};
let initialFormValues = {
  id: null,
  firstname: "",
  lastname: "",
  positionId: null,
};
let formValues = reactive<AddEditFormData>(structuredClone(initialFormValues));

const formRules = {
  firstname: {
    required,
  },
  lastname: {
    required,
  },
  positionId: {
    required: helpers.withParams({ fieldName: "position" }, required),
  },
};
const v$ = useVuelidate(formRules, formValues);

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      resetForm(props.employee);
    }
  },
);

const resetForm = (employee: Employee | null) => {
  if (employee) {
    Object.assign(formValues, {
      id: employee.id,
      firstname: employee.firstname,
      lastname: employee.lastname,
      positionId: employee.position_id,
    });
  } else {
    Object.assign(formValues, initialFormValues);
  }
  v$.value.$reset();
};

const submitHandler = async () => {
  const isFormCorrect = await v$.value.$validate();

  if (isFormCorrect) {
    emit("apply", formValues);
  }
};
let textHeader = computed(() => {
  let actionWord = props.employee ? "Редактирование" : "Создание";
  let result = `${actionWord} сотрудника`;
  return result;
});

let textApply = computed(() => {
  return props.employee ? "Редактировать" : "Создать";
});
</script>

<template>
  <div class="employee-dialog-add-edit">
    <ADialog
      remainOnEsc
      remainOnClickOutside
      :text-header="textHeader"
      :textApply="textApply"
      :isOpen="isOpen"
      @needToClose="emit('needToClose')"
      @apply="submitHandler"
    >
      <AInput
        placeholder="Имя"
        class="mod--mb-half"
        label="Имя *"
        @blur="v$.firstname.$touch"
        :error-messages="v$.firstname.$errors.map((e) => e.$message)"
        v-model="formValues.firstname"
      ></AInput>
      <AInput
        placeholder="Фамилия"
        class="mod--mb-half"
        label="Фамилия *"
        @blur="v$.lastname.$touch"
        :error-messages="v$.lastname.$errors.map((e) => e.$message)"
        v-model="formValues.lastname"
      ></AInput>
      <AMultiSelect
        class="am-col-12 am-col-sm-6"
        label="Должность"
        v-model="formValues.positionId"
        :options="allPositions()"
        @blur="v$.positionId.$touch"
        :error-messages="v$.positionId.$errors.map((e) => e.$message)"
      />
    </ADialog>
  </div>
</template>

<style scoped>
.employee-dialog-add-edit {
}
</style>
