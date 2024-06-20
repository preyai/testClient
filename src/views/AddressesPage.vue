<script setup lang="ts">
import ItemsList from "@/components/ItemsList.vue";
import {getHouses, updateHouse} from "@/api/houses";
import EditableItem from "@/components/EditableItem.vue";

const fetchHouses = () => getHouses();

const saveItem = async (updatedItem: Record<string, string>) => {
  await updateHouse(Number(updatedItem.houseId), updatedItem);
};

</script>

<template>
  <ItemsList
      title="Addresses"
      :fetchItems="fetchHouses"
      filter-key="houseFull"
  >
    <template #default="{ item }">
      <EditableItem :item="item" :saveItem="saveItem" titleKey="houseFull"/>
    </template>
  </ItemsList>
</template>

<style scoped>
/* ваши стили */
</style>
