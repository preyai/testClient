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
import {computed, nextTick, onMounted, ref} from "vue";
import PageHeader from "@/components/PageHeader.vue";
import {useTtStore} from "@/stores/ttStore";
import IssueInfo from "@/components/IssueInfo.vue";
import IssueAttachments from "@/components/IssueAttachments.vue";
import IssueComments from "@/components/IssueComments.vue";
import router from "@/router";
import {useActions} from "@/hooks/useActions";

const tt = useTtStore()
const actions = useActions()
const data = computed(() => tt.issue)
const buttons = computed<ActionSheetButton[]>(() =>
    tt.issue ? actions.getButtons(tt.issue) : []
);
const isOpen = ref(false)
const segment = ref('info')

const showActions = () => {
  isOpen.value = true
}

onMounted(() => {
  const issueId = router.currentRoute.value.query['issueId']?.toString()
  if (issueId)
    tt.setIssue(issueId)
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
            <IonLabel>{{ $t('tt.info') }}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="attachments">
            <IonLabel>{{ $t('tt.attachments') }}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="comments">
            <IonLabel>{{ $t('tt.comments') }}</IonLabel>
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
        :header="$t('tt.actions')"
        :buttons="buttons"
        @didDismiss="()=>isOpen = false"
    />
  </IonPage>
</template>

<style>
.action-sheet-button.action-sheet-separator {
  min-height: 1px; /* Высота разделителя */
  padding: 0;
  background-color: var(--ion-color-light-contrast); /* Цвет разделителя */
}

</style>