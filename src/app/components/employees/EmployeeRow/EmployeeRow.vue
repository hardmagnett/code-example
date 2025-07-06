<script setup lang="ts">

import {type Employee, getFullName} from "@/50_entities/employee";
import {computed, inject} from "vue";
import type {InjectionKey, Ref} from "vue";
import {allPositionsInjectionKey, type Position} from "@/50_entities/position";

const emit = defineEmits<{
  needToDeleteEmployee: [val: { employee: Employee }];
  needToEditEmployee: [val: { employee: Employee }];
}>();

export interface Props {
  employee: Employee;
}
const props = withDefaults(defineProps<Props>(), {});

const positions = inject(allPositionsInjectionKey) as Ref<Position[]>

// todo:: это ваще неоптимально. Нужно похоже создавать дерево где-то в родителе.
const position = computed(()=>{
  return positions.value.find((pos)=>{
    return pos.id === props.employee.position?.id
  })
})
</script>

<template>
  <tr class="employee-row">
    <td class="mod--ellipsis-one-line-on-table-cell">
      {{ getFullName(employee) }}
    </td>
    <td class="mod--ellipsis-one-line-on-table-cell">
      {{ position?.title }}
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
