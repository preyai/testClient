<script setup lang="ts">
import {IssueData} from "@/types/tt";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  modalController
} from "@ionic/vue";
import dayjs from "dayjs";
import {add, eye, eyeOff} from "ionicons/icons";
import IssueAddComment from "@/components/IssueAddComment.vue";
import {useTtStore} from "@/stores/ttStore";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const {issue} = defineProps<{
  issue: IssueData
}>()

const tt = useTtStore()

const openModal = async () => {
  const modal = await modalController.create({
    component: IssueAddComment,
  });

  await modal.present();

  const {role} = await modal.onWillDismiss();

  if (role === 'confirm' && tt.issue)
    tt.setIssue(tt.issue.issue.issueId);
};

</script>

<template>

  <IonList>
    <IonItem v-for="(comment, index) of issue.issue.comments" :key="index">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            {{ comment.author }} add comment [#{{ (Number(index) + 1) }}]
            {{ dayjs(comment.created * 1000).format('DD.MM.YYYY HH:mm') }}
            <IonIcon :icon="comment.private? eyeOff : eye"></IonIcon>
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent class="comment-body">
          {{ comment.body }}
        </IonCardContent>
      </IonCard>
    </IonItem>
  </IonList>
  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton @click="openModal">
      <IonIcon :icon="add"></IonIcon>
    </IonFabButton>
  </IonFab>
</template>

<style scoped>
.comment-body {
  white-space: break-spaces;
}
</style>