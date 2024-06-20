<script setup lang="ts">
import ItemsList from "@/components/ItemsList.vue";
import {getHouses, updateHouse} from "@/api/houses";
import EditableItem from "@/components/EditableItem.vue";
import {IonPage} from "@ionic/vue";

const fetchHouses = () => getHouses();

const saveItem = async (updatedItem: Record<string, string>) => {
  await updateHouse(Number(updatedItem.houseId), updatedItem);
};

</script>

<template>
  <IonPage>
    <ItemsList
        title="Addresses"
        :fetchItems="fetchHouses"
        filter-key="houseFull"
    >
      <template #default="{ item, onSave }">
        <EditableItem :item="item" :saveItem="saveItem" titleKey="houseFull" @onSave="onSave"/>
      </template>
    </ItemsList>
  </IonPage>
</template>

<style scoped>
/* ваши стили */
</style>
