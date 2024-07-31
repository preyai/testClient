<script setup lang="ts">

import {IonContent, IonItem, IonLabel, IonList, IonPage} from "@ionic/vue";
import {computed, onMounted} from "vue";
import {useTtStore} from "@/stores/ttStore";
import PageHeader from "@/components/PageHeader.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const ttStore = useTtStore()
const filters = computed(() => ttStore.project?.filters)

const handler = (filter: string) => {
  ttStore.setFilter(filter)
  router.push('/tt/issues')
}

</script>

<template>
  <IonPage>
    <PageHeader
        label="filters"
        defaultHref="/tt"
    />
    <IonContent>
      <IonList v-if="filters">
        <IonItem v-for="filter in filters" :key="filter.projectFilterId" @click="handler(filter.filter)">
          <IonLabel>{{ filter.filter }}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>