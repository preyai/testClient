<script setup lang="ts">
import ItemsList from "@/components/ItemsList.vue";
import {getCameras} from "@/api/cameras";
import EditableItem from "@/components/EditableItem.vue";

const fetchCameras = () => getCameras();

const saveItem = async (updatedItem: Record<string, string>) => {
};
</script>

<template>
  <ItemsList
      title="Cameras"
      :fetchItems="fetchCameras"
      filter-key="name"
  >
    <template #default="{ item }">
      <EditableItem :item="item" :saveItem="saveItem" titleKey="name"/>
    </template>
  </ItemsList>
</template>

<style scoped>
/* ваши стили */
</style>
