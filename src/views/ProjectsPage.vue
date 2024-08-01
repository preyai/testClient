<script setup lang="ts">

import {IonContent, IonItem, IonLabel, IonList, IonPage} from "@ionic/vue";
import {useTtStore} from "@/stores/ttStore";
import {computed, nextTick} from "vue";
import {Project} from "@/types/tt";
import {useRouter} from "vue-router";
import PageHeader from "@/components/PageHeader.vue";

const router = useRouter()
const ttStore = useTtStore()
const projects = computed(() => ttStore.meta?.projects)

const handler = async (project: Project) => {
  ttStore.setProject(project)
  await nextTick()
  await router.push('/tt/filters')
}

</script>

<template>
  <IonPage>
    <PageHeader
        label="projects"
        defaultHref="/tt"
    />
    <IonContent>
      <IonList v-if="projects">
        <IonItem v-for="project in projects" :key="project.projectId" @click="handler(project)">
          <IonLabel>{{ project.project }}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>