<script setup lang="ts">
import EmployeeRow from "@/app/components/employees/EmployeeRow/EmployeeRow.vue";
import { useEmployeesStore } from "@/app/stores/employee";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, watch } from "vue";
import AInfinity from "@/a-library/components/other/AInfinity/AInfinity.vue";
const employeesStore = useEmployeesStore();
const { paginatedEmployees, totalPaginatedEmployeesQty } =
  storeToRefs(employeesStore);
const { fetchPaginatedEmployees, clearPagination } = employeesStore;
import type { StateHandler } from "@/a-library/components/other/AInfinity/AInfinity.vue";

import type { Employee, FilterEmployees } from "@/50_entities/employee/model";
import { EmployeeAPIService } from "@/50_entities/employee/";

const employeeAPIService = new EmployeeAPIService();

defineEmits(["needToDeleteEmployee", "needToEditEmployee"]);

export interface Props {
  filter: FilterEmployees;
}
const props = withDefaults(defineProps<Props>(), {});

let pageNumber = ref(1);
let infinityResetId = ref(0);

let paginatedEmployeesTEMP = ref<Employee[]>([]);

let filterChangeHandler = () => {
  pageNumber.value = 1;
  clearPagination();
  infinityResetId.value++;
};
watch(props.filter, () => {
  filterChangeHandler();
});

const loadMore = async ($state: StateHandler) => {
  await fetchPaginatedEmployees({
    page: pageNumber.value,
    filter: props.filter,
  });

  const tempResult = await employeeAPIService.fetchPaginatedEmployees({
    page: pageNumber.value,
    filter: props.filter,
  });
  // eslint-disable-next-line no-console -- Это всё равно я буду убирать.
  console.log(tempResult);
  console.log("^...tempResult:");

  paginatedEmployeesTEMP.value = tempResult.data;

  if (paginatedEmployees.value.length === totalPaginatedEmployeesQty.value) {
    $state.completed();
  } else {
    $state.loaded();
  }
  pageNumber.value++;
};

onBeforeMount(() => {});
</script>

<template>
  <ATable class="employees-table a-table--fixed-header">
    <p style="font-size: 9px">{{ paginatedEmployeesTEMP }}</p>

    <thead>
      <tr>
        <th>Сотрудник</th>
        <th class="employee-table__col-position">Должность</th>
        <th class="employee-table__col-buttons"></th>
      </tr>
    </thead>
    <tbody>
      <EmployeeRow
        v-for="employee in paginatedEmployees"
        :employee="employee"
        @needToDeleteEmployee="$emit('needToDeleteEmployee', $event)"
        @needToEditEmployee="$emit('needToEditEmployee', $event)"
        :key="employee.id"
      />
    </tbody>

    <template #appendRoot>
      <AInfinity :resetId="infinityResetId" @needToLoadMore="loadMore" />
    </template>
  </ATable>
</template>

<style scoped>
.employees-table {
  .a-infinity {
    flex: 1 1 auto;
  }
  .employee-table__col-buttons {
    padding: 0;
    width: 60px;
  }
  .employee-table__col-id {
    width: 39px;
  }
  .employee-table__col-position {
    --width: 80px;
    @container style(--bp-sm-or-more) {
      --width: 200px;

      width: var(--width);
      max-width: var(--width);
    }
    @container style(--bp-lg-or-more) {
      --width: 300px;
    }
    @container style(--bp-xl-or-more) {
      --width: 400px;
    }
    @container style(--bp-xxl-or-more) {
      --width: 500px;
    }
  }
}
</style>
