<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePositionsStore } from "@/app/stores/position";
import { computed, onBeforeMount, ref } from "vue";
import localStorageService from "@/a-library/helpers/DOM/localStorageService";
import debounce from "@/a-library/helpers/language/functions/debounce";
import deepEqual from "@/a-library/helpers/language/functions/deepEqual";
import type { FilterEmployees } from "@/50_entities/employee/model";

const positionsStore = usePositionsStore();
const { allPositions } = storeToRefs(positionsStore);

const emit = defineEmits<{
  needToUpdateWholeFilter: [value: FilterEmployees];
}>();

let filterInitial: FilterEmployees = {
  query: "",
  positionsIds: [],
};

export interface Props {
  filter: FilterEmployees;
}
const props = withDefaults(defineProps<Props>(), {});

let isFilterHidden = ref(false);

let filterInner = computed(() => {
  return props.filter;
});

const filterIcon = computed(() => {
  return isFilterHidden.value ? "mdi-filter-outline" : "mdi-filter";
});
const filterResetIcon = computed(() => {
  return isFilterChanged.value
    ? "mdi-filter-remove"
    : "mdi-filter-remove-outline";
});

const isFilterChanged = computed(() => {
  return !deepEqual(props.filter, filterInitial);
});
const toggleFilterVisibility = () => {
  isFilterHidden.value = !isFilterHidden.value;
  localStorageService.setItem(
    "filter-employees-isHidden",
    isFilterHidden.value,
  );
};
const setFilterVisibilityBasedOnLocalStorage = () => {
  const isFilterHiddenFromStorage = localStorageService.getItem(
    "filter-employees-isHidden",
    false,
  );
  isFilterHidden.value = isFilterHiddenFromStorage;
};
const resetFilter = () => {
  emit("needToUpdateWholeFilter", filterInitial);
};

const updateQuery = debounce((eventData: string) => {
  filterInner.value.query = eventData;
});

onBeforeMount(() => {
  setFilterVisibilityBasedOnLocalStorage();
});
</script>

<template>
  <div
    class="employees-filter am-cols"
    :class="{ 'employees-filter--hidden': isFilterHidden }"
  >
    <AMountedTeleport to="#page-header-filter-icon-place">
      <ABtn icon @click="resetFilter" :disabled="!isFilterChanged"
        ><AIcon :icon="filterResetIcon"
      /></ABtn>
      <ABtn icon @click="toggleFilterVisibility"
        ><AIcon :icon="filterIcon"
      /></ABtn>
    </AMountedTeleport>

    <AInput
      autofocus
      class="am-col-12 am-col-sm-6"
      label="Имя"
      placeholder="Поиск регистрозависимый"
      :model-value="filterInner.query"
      @update:model-value="updateQuery"
      hide-hint
    ></AInput>
    <AMultiSelect
      class="am-col-12 am-col-sm-6"
      label="Должности"
      multiple
      v-model="filterInner.positionsIds"
      :options="allPositions()"
      hide-hint
    />
  </div>
</template>

<style scoped>
.employees-filter {
  max-height: 120px;
  overflow-y: hidden;
  transition: max-height var(--time-short) ease-in;
  will-change: max-height;

  &.employees-filter--hidden {
    max-height: 0;
    transition: max-height var(--time-short) var(--transition-extra-easy-out);
  }
}
</style>
