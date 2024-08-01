<script setup lang="ts">

import {IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage} from "@ionic/vue";
import {onMounted, ref} from "vue";
import PageHeader from "@/components/PageHeader.vue";
import {useTtStore} from "@/stores/ttStore";
import {IssueData} from "@/types/tt";
import IssueField from "@/components/IssueField.vue";

const tt = useTtStore()
const data = ref<IssueData>()

onMounted(() => {
  tt.getIssue()
      .then(res => {
        console.log(res)
        data.value = res
      })
})
</script>

<template>
  <IonPage>
    <PageHeader
        :label=" tt.issue ||'issue'"
        defaultHref="/tt"
    />
    <IonContent>
      <IonList v-if="data">
        <IssueField v-for="field of data.fields" :issue="data.issue" :field="field" :key="field"/>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>