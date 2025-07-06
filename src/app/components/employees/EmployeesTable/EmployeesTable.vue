<script setup lang="ts">
import EmployeeRow from "@/app/components/employees/EmployeeRow/EmployeeRow.vue";
import { onBeforeMount, ref, watch } from "vue";
import AInfinity from "@/a-library/components/other/AInfinity/AInfinity.vue";
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

let paginatedEmployees = ref<Employee[]>([]);
const totalPaginatedEmployeesQty = ref<number | null>(null)

let filterChangeHandler = () => {
  pageNumber.value = 1;
  clearPagination();
  infinityResetId.value++;
};
watch(props.filter, () => {
  filterChangeHandler();
});

const clearPagination = ()=>{
  totalPaginatedEmployeesQty.value = null;
  paginatedEmployees.value = [];
}

const loadMore = async ($state: StateHandler) => {
  const tempResult = await employeeAPIService.fetchPaginatedEmployees({
    page: pageNumber.value,
    filter: props.filter,
  });
  paginatedEmployees.value = [
      ...paginatedEmployees.value,
      ...tempResult.data
  ];
  totalPaginatedEmployeesQty.value = tempResult.total_count;

  if (paginatedEmployees.value.length === totalPaginatedEmployeesQty.value) {
    $state.completed();
  } else {
    $state.loaded();
  }
  pageNumber.value++;
};
</script>

<template>
  <Teleport defer to="#total-paginated-employees-qty-teleport">
    {{ totalPaginatedEmployeesQty }}
  </Teleport>
  <ATable class="employees-table a-table--fixed-header">
    <p style="font-size: 9px">{{ paginatedEmployees }}</p>

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
