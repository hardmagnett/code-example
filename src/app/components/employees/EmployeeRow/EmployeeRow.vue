<script setup lang="ts">
// import type Employee from "@/app/models/employee/Employee";
// import type Employee from "@/app/models/employee/Employee";

import {type Employee, getFullName} from "@/50_entities/employee";

const emit = defineEmits<{
  needToDeleteEmployee: [val: { employee: Employee }];
  needToEditEmployee: [val: { employee: Employee }];
}>();

export interface Props {
  employee: Employee;
}
withDefaults(defineProps<Props>(), {});
</script>

<template>
  <tr class="employee-row">
    <td class="mod--ellipsis-one-line-on-table-cell">
      <!--{{ employee.fullname }}-->
      {{ getFullName(employee) }}
    </td>
    <td class="mod--ellipsis-one-line-on-table-cell">
      {{ employee.position?.title }}
    </td>
    <td class="employee-row__buttons">
      <ABtn icon @click="emit('needToEditEmployee', { employee: employee })"
        ><AIcon icon="mdi-pencil"
      /></ABtn>
      <ABtn
        icon
        class="a-btn--error"
        @click="emit('needToDeleteEmployee', { employee: employee })"
        ><AIcon icon="mdi-delete"
      /></ABtn>
    </td>
  </tr>
</template>

<style scoped>
.employee-row {
  .employee-row__buttons {
    padding: 0;
  }
}
</style>
