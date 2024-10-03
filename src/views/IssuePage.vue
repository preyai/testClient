<script setup lang="ts">

import {
  ActionSheetButton, alertController,
  IonActionSheet,
  IonContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar
} from "@ionic/vue";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import PageHeader from "@/components/PageHeader.vue";
import {useTtStore} from "@/stores/ttStore";
import IssueInfo from "@/components/IssueInfo.vue";
import IssueAttachments from "@/components/IssueAttachments.vue";
import IssueComments from "@/components/IssueComments.vue";
import {useActions} from "@/hooks/useActions";
import {useRoute, useRouter} from "vue-router";

const tt = useTtStore()
const actions = useActions()
const router = useRouter()

const data = computed(() => tt.issue)
const buttons = computed<ActionSheetButton[]>(() =>
    tt.issue ? actions.getButtons(tt.issue) : []
);
const isOpen = ref(false)
const segment = ref('info')

const showActions = () => {
  isOpen.value = true
}

const loadIssue = () => {
  const issueId = router.currentRoute.value.query['issueId']?.toString()
  if (issueId)
    tt.setIssue(issueId)
        .catch(() => {
          alertController.create({
            header: 'Не удалось загрузить',
            buttons: [{
              text: 'Назад',
              handler: () => {
                router.go(-1)
              }
            }],
          }).then(alert => alert.present())
        })
}
onMounted(loadIssue)

watch(() => router.currentRoute.value.query['issueId'], loadIssue)
</script>

<template>
  <IonPage>
    <PageHeader
        :label=" data?.issue.issueId ||'issue'"
        defaultHref="/tt"
        actions
        @onActionsClick="showActions"
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