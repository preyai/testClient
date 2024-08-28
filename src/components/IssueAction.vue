<script setup lang="ts">

import {IonButton, IonButtons, IonContent, IonHeader, IonItem, IonTitle, IonToolbar, modalController} from "@ionic/vue";
import {onMounted, ref} from "vue";
import api from "@/api";
import {useTtStore} from "@/stores/ttStore";
import IssueInput from "@/components/IssueInput.vue";

const {name, withoutAccept} = defineProps<{
  name: string,
  withoutAccept: boolean,
}>()

const tt = useTtStore()

const fields = ref<Record<string, string>>()

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => {
  api.post(`tt/action/${tt.issue?.issue.issueId}`, {
    action:name,
    set: {
      fields,
    }
  })
}

onMounted(() => {
  if (!tt.issue)
    return;

  api.get('tt/action', {
    _id: tt.issue.issue.issueId,
    action: name
  }).then(res => fields.value = res.template)
})
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">Cancel</IonButton>
      </IonButtons>
      <IonTitle>{{ name }}</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="confirm" :strong="true">Confirm</IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent v-if="fields" class="ion-padding">
    <IonItem v-for="key in Object.keys(fields)" :key="key">
      <IssueInput :field="fields[key]"/>
    </IonItem>
  </IonContent>
</template>

<style scoped>

</style>