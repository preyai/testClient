<script setup lang="ts">

import {IonContent, IonItem, IonLabel, IonList, IonPage} from "@ionic/vue";
import {computed, nextTick, onMounted} from "vue";
import {useTtStore} from "@/stores/ttStore";
import PageHeader from "@/components/PageHeader.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const ttStore = useTtStore()
const filters = computed(() => ttStore.project?.filters)

const handler = async (filter: string) => {
  await router.push(`/tt/issues?projectId=${ttStore.project?.projectId}&filter=${filter}`)
}

onMounted(() => {
  const projectId = router.currentRoute.value.query['projectId']
  if (projectId)
    ttStore.setProject(ttStore.meta?.projects.find(project => project.projectId === Number(projectId)))
  if (!filters.value)
    router.replace('/tt')
})
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
          <IonLabel>{{ ttStore.meta?.filters[filter.filter] || filter.filter }}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>