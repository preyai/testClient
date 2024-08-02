<script setup lang="ts">

import {
  ActionSheetButton,
  IonActionSheet,
  IonContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar
} from "@ionic/vue";
import {computed, onMounted, ref} from "vue";
import PageHeader from "@/components/PageHeader.vue";
import {useTtStore} from "@/stores/ttStore";
import IssueInfo from "@/components/IssueInfo.vue";
import IssueAttachments from "@/components/IssueAttachments.vue";
import IssueComments from "@/components/IssueComments.vue";

const tt = useTtStore()
const data = computed(() => tt.issue)
const buttons = computed<ActionSheetButton[]>(() => Object.values(data.value?.actions || {}).map(i => ({
  text: i,
  handler: () => console.log(i),
})))
const isOpen = ref(false)
const segment = ref('info')

const showActions = () => {
  isOpen.value = true
}

onMounted(() => {

  // tt.getIssue()
  //     .then(res => {
  //       data.value = res
  //     })
  //     .catch(() => {
  //       router.replace('/tt')
  //     })
})
</script>

<template>
  <IonPage>
    <PageHeader
        :label=" data?.issue.issueId ||'issue'"
        defaultHref="/tt"
        actions
        @onClick="showActions"
    >
      <IonToolbar>
        <IonSegment v-model="segment">
          <IonSegmentButton value="info">
            <IonLabel>Info</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="attachments">
            <IonLabel>Attachments</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="comments">
            <IonLabel>Comments</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </PageHeader>
    <IonContent>
      <IssueInfo v-if="data && segment === 'info'" :issue="data"/>
      <IssueAttachments v-if="data && segment === 'attachments'" :issue="data"/>
      <IssueComments v-if="data && segment === 'comments'" :issue="data"/>
    </IonContent>
    <IonActionSheet
        :is-open="isOpen"
        header="Actions"
        :buttons="buttons"
        @didDismiss="()=>isOpen = false"
    />
  </IonPage>
</template>

<style scoped>

</style>