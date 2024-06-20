<script setup lang="ts" generic="T extends apiItem">
import {IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar} from "@ionic/vue";
import {computed, onMounted, Ref, ref} from "vue";
import {apiItem} from "@/types/data";

const props = defineProps<{
  title: string,
  fetchItems: () => Promise<T[]>,
  filterKey: string,
}>();

const items = ref<T[]>([]) as Ref<T[]>;
const query = ref("");
const filteredItems = computed(() => {
  if (!query.value)
    return items.value;
  return items.value.filter(item => item[props.filterKey].toLowerCase().includes(query.value.toLowerCase()));
});

onMounted(() => {
  props.fetchItems().then(result => items.value = result);
});
</script>

<template>
  <IonPage>
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
        />
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>
/* ваши стили */
</style>
