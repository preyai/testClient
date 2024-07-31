<script setup lang="ts">

import {IonContent, IonList, IonPage, IonItem, IonLabel} from "@ionic/vue";
import {onMounted, ref} from "vue";
import PageHeader from "@/components/PageHeader.vue";
import {useTtStore} from "@/stores/ttStore";
import api from "@/api";
import {DataStructure} from "@/types/tt";

const tt = useTtStore()
const issues = ref<DataStructure>()

onMounted(() => {
  if (!tt.project || !tt.filter)
    return
  api.get('tt/issues', {
    project: tt.project.acronym,
    filter: tt.filter,
    limit: '2',
    skip: '0',
  }).then((res) => {
    issues.value = res.issues
  })
})
</script>

<template>
  <IonPage>
    <PageHeader
        label="issues"
        defaultHref="/tt"
    />
    <IonContent>
      <IonList v-if="issues">
        <IonItem v-for="issue of issues.issues" :key="issue.id">
          <IonLabel>{{ issue.subject}}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>