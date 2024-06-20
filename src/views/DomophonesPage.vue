<script setup lang="ts">
import ItemsList from "@/components/ItemsList.vue";
import {getDomophones} from "@/api/domophones";
import EditableItem from "@/components/EditableItem.vue";
import {IonPage} from "@ionic/vue";

const disabled = ['ip', 'sub_id']
const fetchDomophones = () => getDomophones();

const saveItem = async (updatedItem: Record<string, string>) => {
};
</script>

<template>
  <IonPage>
    <ItemsList
        title="Domophones"
        :fetchItems="fetchDomophones"
        filterKey="name"
    >
      <template #default="{ item }">
        <EditableItem
            :item="item"
            :saveItem="saveItem"
            :disabledKeys="disabled"
            titleKey="name"
        />
      </template>
    </ItemsList>
  </IonPage>
</template>

<style scoped>
/* ваши стили */
</style>
