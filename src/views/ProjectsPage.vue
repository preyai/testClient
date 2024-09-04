<script setup lang="ts">

import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent
} from "@ionic/vue";
import {useTtStore} from "@/stores/ttStore";
import {Project} from "@/types/tt";
import {useRouter} from "vue-router";
import PageHeader from "@/components/PageHeader.vue";

const router = useRouter()
const ttStore = useTtStore()

const handler = async (project: Project) => {
  await router.push(`/tt/filters?projectId=${project.projectId}`)
}

const handleRefresh = (event: RefresherCustomEvent) => {
  ttStore.load()
      .then(() => event.target.complete())
};

</script>

<template>
  <IonPage>
    <PageHeader
        label="projects"
        defaultHref="/tt"
    />
    <IonContent>
      <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent/>
      </IonRefresher>
      <IonList v-if="ttStore.meta?.projects">
        <IonItem v-for="project in ttStore.meta.projects" :key="project.projectId" @click="handler(project)">
          <IonLabel>{{ project.project }}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>