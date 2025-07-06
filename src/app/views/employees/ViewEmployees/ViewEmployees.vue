<script setup lang="ts">
import EmployeesTable from "@/app/components/employees/EmployeesTable/EmployeesTable.vue";
import AIcon from "@/a-library/components/typo/AIcon/AIcon.vue";
import {onBeforeMount, reactive, ref, provide, inject, readonly} from "vue";
import EmployeeDialogDelete from "@/app/components/employees/EmployeeDialogDelete/EmployeeDialogDelete.vue";
import EmployeeDialogAddEdit from "@/app/components/employees/EmployeeDialogAddEdit/EmployeeDialogAddEdit.vue";
import { globalProperties } from "@/main";
import EmployeesFilter from "@/app/components/employees/EmployeesFilter/EmployeesFilter.vue";
import { useEmployeesStore } from "@/app/stores/employee";
import APageHeaderWithTeleport from "@/a-library/components/layout/APageHeaderWithTeleport/APageHeaderWithTeleport.vue";
import { getValueOfCSSVariableAsNumber } from "@/a-library/helpers/DOM/getCSSVariable";
const employeesStore = useEmployeesStore();
import type { AddEditFormData } from "@/app/components/employees/EmployeeDialogAddEdit/EmployeeDialogAddEdit.vue";
import {
  type Employee,
  type FilterEmployees,
  getFullName,
  type TotalPaginatedEmployeesQty
} from "@/50_entities/employee";

import { EmployeeAPIService } from "@/50_entities/employee/";
const employeeAPIService = new EmployeeAPIService();

import {allPositionsInjectionKey, type Position, PositionAPIService} from "@/50_entities/position/";
const positionAPIService = new PositionAPIService();

let isOpenDialogEmployeeDeleting = ref(false);

let employeeToEdit = ref<Employee | null>(null);
let employeeToDelete = ref<Employee | null>(null);

let isOpenDialogEmployeeCreatingEditing = ref(false);

let paginatedEmployees = ref<Employee[]>([]);
const totalPaginatedEmployeesQty = ref<TotalPaginatedEmployeesQty>(null)

let positions = ref<Position[]>([])
provide(allPositionsInjectionKey, positions)

let filter = reactive({
  query: "",
  positionsIds: [] as number[],
});

let filterUpdatesQtyKey = ref(0);
let closingDialogAnimationTime = getValueOfCSSVariableAsNumber("--time-short");

const needToUpdatePaginatedEmployeesHandler = (employees: Employee[])=>{
  paginatedEmployees.value = employees
}

const needToDeleteEmployeeHandler = ({ employee }: { employee: Employee }) => {
  employeeToDelete.value = employee;
  isOpenDialogEmployeeDeleting.value = true;
};

const needToEditEmployeeHandler = ({ employee }: { employee: Employee }) => {
  employeeToEdit.value = employee;
  isOpenDialogEmployeeCreatingEditing.value = true;
};

const needToCreateEmployeeHandler = () => {
  employeeToEdit.value = null;
  isOpenDialogEmployeeCreatingEditing.value = true;
};

const deleteEmployee = () => {
  isOpenDialogEmployeeDeleting.value = false;
  setTimeout(async () => {
    if (!employeeToDelete.value) return;
    let deletedEmployee = await employeeAPIService.deleteEmployee({
      employeeId: employeeToDelete.value.id,
    });
    
    if (!deletedEmployee) return;
    const deletedId = deletedEmployee.id;
    paginatedEmployees.value = paginatedEmployees.value.filter(e=> e.id !== deletedId)

    // Это скопировано из экшна.
    // if (typeof this.totalPaginatedEmployeesQty === "number") {
    //   this.totalPaginatedEmployeesQty--;
    // }
    
    
    globalProperties.$toast({
      message: `Сотрудник "${getFullName(deletedEmployee)}" удален`,
      type: "error",
    });
  }, closingDialogAnimationTime);
};
const createEditEmployee = async (formData: AddEditFormData) => {
  isOpenDialogEmployeeCreatingEditing.value = false;
  let textForToast: string;
  if (employeeToEdit.value) {
    let editedEmployee = await employeesStore.editEmployee({ formData });
    textForToast = `Сотрудник "${editedEmployee.fullname}" отредактирован`;
  } else {
    let createdEmployee = await employeesStore.createEmployee({
      formData,
      filter,
    });
    textForToast = `Сотрудник "${createdEmployee.fullname}" добавлен`;
  }
  globalProperties.$toast({
    message: textForToast,
  });
};
const updateWholeFilter = (newFilter: FilterEmployees) => {
  Object.assign(filter, newFilter);
};
onBeforeMount(async () => {
  // fetchAllPositions();
  positions.value = (await positionAPIService.fetchAllPositions()).data
  // positions = (await positionAPIService.fetchAllPositions()).data
});
</script>

<template>
  <div class="employees">
    <APageHeaderWithTeleport text="Сотрудники" />
    <div class="employees__add-and-qty mod--mb-half">
      <ABtn @click="needToCreateEmployeeHandler">
        <AIcon icon="mdi-plus-circle-outline"></AIcon> Создать
      </ABtn>
      <p class="mod--mt-0 mod--mb-0">
        Найдено:
        <span class="employees__qty-number">
          {{totalPaginatedEmployeesQty}}
        </span>
      </p>
    </div>

    <EmployeesFilter
      :filter="filter"
      @needToUpdateWholeFilter="updateWholeFilter"
      :key="filterUpdatesQtyKey"
    />

    <EmployeeDialogDelete
      v-if="employeeToDelete"
      :employee="employeeToDelete as Employee"
      :is-open="isOpenDialogEmployeeDeleting"
      @needToClose="isOpenDialogEmployeeDeleting = false"
      @apply="deleteEmployee"
    ></EmployeeDialogDelete>
    <EmployeeDialogAddEdit
      :employee="employeeToEdit as Employee | null"
      :is-open="isOpenDialogEmployeeCreatingEditing"
      @needToClose="isOpenDialogEmployeeCreatingEditing = false"
      @apply="createEditEmployee"
    ></EmployeeDialogAddEdit>

    <EmployeesTable
      :filter="filter"
      :totalPaginatedEmployeesQty="totalPaginatedEmployeesQty"
      :paginated-employees="paginatedEmployees"
      @needToDeleteEmployee="needToDeleteEmployeeHandler"
      @needToEditEmployee="needToEditEmployeeHandler"
      @needToUpdatePaginatedEmployees="needToUpdatePaginatedEmployeesHandler"
      @needToUpdateTotalPaginatedEmployeesQty="($event: number | null)=> {totalPaginatedEmployeesQty = $event}"
    />
  </div>
</template>
<style scoped>
.employees {
  display: flex;
  flex-flow: column nowrap;

  /*Чтобы таблица растягивалась на всю высоту, даже если у неё недостаточно записей*/
  /*Чтобы лоадер можно было разместить по центру*/
  flex: 1 1 auto;
  > * {
    flex: 0 0 auto;
  }

  overflow-y: auto;
  .employees__add-and-qty {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .employees__qty-number {
      display: inline-block;
      width: 30px;
      text-align: right;
    }
  }
  .employees-table {
    flex: 1 1 auto;
    overflow-y: auto;
  }
  .employees-filter {
    flex: 0 0 auto;
  }
}
</style>
