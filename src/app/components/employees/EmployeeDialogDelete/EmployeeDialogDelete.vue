<script setup lang="ts">
import {} from "vue";
import { iDialogablePropDefaults } from "@/app/component-interfaces/IDialogable";
import type { IDialogableProps } from "@/app/component-interfaces/IDialogable";
import {type Employee, getFullName} from "@/50_entities/employee";
// import type Employee from "@/app/models/employee/Employee";

// const emit = defineEmits<{
defineEmits<{
  needToClose: [];
  apply: [];
}>();

export interface Props extends IDialogableProps {
  employee: Employee;
}
withDefaults(defineProps<Props>(), {
  ...iDialogablePropDefaults,
});
</script>

<template>
  <div class="employee-dialog-delete">
    <ADialog
      remainOnEsc
      remainOnClickOutside
      text-header="Удаление сотрудника"
      textApply="Удалить"
      cssClassApply="a-btn--error"
      :isOpen="isOpen"
      @needToClose="$emit('needToClose')"
      @apply="$emit('apply')"
    >
      <p>Действительно удалить сотрудника "{{ getFullName(employee) }}"?</p>
    </ADialog>
  </div>
</template>

<style scoped>
.employee-dialog-delete {
}
</style>
