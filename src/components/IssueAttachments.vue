<script setup lang="ts">
import {IssueData} from "@/types/tt";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList
} from "@ionic/vue";
import {useAuthStore} from "@/stores/authStore";
import dayjs from "dayjs";
import {add} from "ionicons/icons";
import {usePhotoGallery} from "@/hooks/usePhotoGallery";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const {issue} = defineProps<{
  issue: IssueData
}>()

const {token} = useAuthStore()
const {photos, takePhoto} = usePhotoGallery();
</script>

<template>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
          <ion-img :src="photo.webviewPath"></ion-img>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-fab/>
  </ion-content>
  <IonList>
    <IonItem v-for="img of issue.issue.attachments" :key="img.id">
      <IonCard>
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
    </IonItem>
  </IonList>
  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton @click="takePhoto">
      <IonIcon :icon="add"></IonIcon>
    </IonFabButton>
  </IonFab>
</template>

<style scoped>

</style>