<script setup lang="ts" generic="T extends apiItem">
import {IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar} from "@ionic/vue";
import {computed, onMounted, Ref, ref} from "vue";
import {apiItem} from "@/types/data";

const {title, fetchItems, filterKey} = defineProps<{
  title: string,
  fetchItems: () => Promise<T[]>,
  filterKey: string,
}>();

const items = ref<T[]>([]) as Ref<T[]>;
const query = ref("");
const filteredItems = computed(() => {
  if (!query.value)
    return items.value;
  return items.value.filter(item => item[filterKey].toLowerCase().includes(query.value.toLowerCase()));
});

const load = () => {
  fetchItems().then(result => items.value = result);
}

onMounted(load);

</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle>{{ title }}</IonTitle>
    </IonToolbar>
    <IonToolbar>
      <IonSearchbar v-model="query"/>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <IonList>
      <slot
          v-for="item in filteredItems" :key="item.id"
          :item="item"
          :onSave="load"
      />
    </IonList>
  </IonContent>
</template>

<style scoped>
/* ваши стили */
</style>
