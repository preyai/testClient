<script setup lang="ts">
import {
  modalController,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonTextarea,
  IonCheckbox
} from "@ionic/vue";
import {ref} from "vue";
import {useTtStore} from "@/stores/ttStore";
import {useAttachments} from "@/hooks/useAttachments";
import {CameraSource} from "@capacitor/camera";

const tt = useTtStore()
const {takePhoto} = useAttachments()
const comment = ref<string>("");
const commentPrivate = ref(true);

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => {
  tt.addComment(comment.value, commentPrivate.value)
      .then(() =>
          modalController.dismiss(null, 'confirm')
      )
}

const handler = () => {
  takePhoto(CameraSource.Photos);
}

</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">Cancel</IonButton>
      </IonButtons>
      <IonTitle>Add file</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="confirm" :strong="true">Confirm</IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonButton @click="handler">123</IonButton>
  </IonContent>
</template>

<style scoped>

</style>