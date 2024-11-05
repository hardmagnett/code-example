<script setup lang="ts">
import {} from "vue";
import RootParent from "@/a-library/views/component-list/ViewExperiments/RootParent.vue";
import APageHeaderWithTeleport from "@/a-library/components/layout/APageHeaderWithTeleport/APageHeaderWithTeleport.vue";
</script>

<template>
  <div class="view-about">
    <APageHeaderWithTeleport text="О проекте" />
    <RootParent />
    <h2>Новые технологии</h2>
    <p>
      Применяются свежие (на 2024-й год) возможности браузера, <br />
      Поэтому правильная работа гарантируется лишь в Chrome и Edge на десктопе и
      на смартфонах.
      <br />
    </p>
    <p>Что из нового:</p>
    <ul>
      <li>
        <code class="mod--code"
          >@container style(--pseudo-boolean-css-variable)</code
        >
      </li>
      <li>Dialog, Popover</li>
      <li>Anchor Positioning</li>
    </ul>

    <h2>Нет UI-UX-зависимостей</h2>
    <p>Зависимые библиотеки применяются лишь для работы с данными.</p>
    <p>Все UI-UX-компоненты самописные.</p>
    <h2>Мокапирование бэкенда</h2>
    <p>HTTP запросы и база данных эмулируются в Service Worker</p>
    <p>После перезагрузки страницы внесённые изменения сбрасываются.</p>
    <h2>Адаптив</h2>
    <p>Предусмотрена ширина окна браузера от 320px до 2560px.</p>
    <p>
      На более высоких разрешениях пользователи обычно включают масштабирование
      либо в ОС либо в браузере.
    </p>
  </div>
</template>

<style scoped>
.view-about {
}
</style>
