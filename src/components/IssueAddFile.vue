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

const tt = useTtStore()

const comment = ref<string>("");
const commentPrivate = ref(true);

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => {
  tt.addComment(comment.value, commentPrivate.value)
      .then(() =>
          modalController.dismiss(null, 'confirm')
      )
}
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">Cancel</IonButton>
      </IonButtons>
      <IonTitle>Add comment</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="confirm" :strong="true">Confirm</IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonItem>
      <IonTextarea label-placement="floating" label="comment" placeholder="Type something here" v-model="comment"/>
    </IonItem>
    <IonItem>
      <IonCheckbox id="terms" v-model="commentPrivate">
        <div class="ion-text-wrap">comment private</div>
      </IonCheckbox>
    </IonItem>
  </IonContent>
</template>

<style scoped>

</style>