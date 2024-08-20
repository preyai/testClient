<script setup lang="ts">
import {IssueData} from "@/types/tt";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonList,
  modalController
} from "@ionic/vue";
import {useAuthStore} from "@/stores/authStore";
import dayjs from "dayjs";
import {add} from "ionicons/icons";
import {useTtStore} from "@/stores/ttStore";
import IssueAddFile from "@/components/IssueAddFile.vue";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const {issue} = defineProps<{
  issue: IssueData
}>()

const {token} = useAuthStore()
const tt = useTtStore()

const openModal = async () => {
  const modal = await modalController.create({
    component: IssueAddFile,
  });

  await modal.present();

  const {role} = await modal.onWillDismiss();

  if (role === 'confirm' && tt.issue)
    tt.setIssue(tt.issue.issue.issueId);
};
// const {photos, takePhoto} = useAttachments();
</script>

<template>
  <IonCard v-for="img of issue.issue.attachments" :key="img.id">
    <img
        :alt="img.filename"
        :src="`${SERVER_URL}/tt/file?issueId=${issue.issue.issueId}&filename=${img.filename}&_token=${token}`"
    />
    <IonCardHeader>
      <IonCardTitle>{{ dayjs(img.metadata.date * 1000).format('DD.MM.YYYY HH:mm') }} - {{
          img.metadata.attachman
        }}
      </IonCardTitle>
      <IonCardSubtitle>{{ img.filename }}</IonCardSubtitle>

    </IonCardHeader>
    <IonCardContent>

    </IonCardContent>
  </IonCard>
  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton @click="openModal">
      <IonIcon :icon="add"></IonIcon>
    </IonFabButton>
  </IonFab>
</template>

<style scoped>

</style>