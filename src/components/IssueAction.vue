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

const fields = ref<Record<string, any>>({});

const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = () => {
  console.log(fields.value)
  api.put(`tt/action/${tt.issue?.issue.issueId}`, {
    action: name,
    set: fields.value
  })
      .then(() => {
        modalController.dismiss(null, 'confirm')
        if (tt.issue)
          tt.setIssue(tt.issue.issue.issueId)
      })
}

onMounted(() => {
  if (!tt.issue) return;

  api.get('tt/action', {
    _id: tt.issue.issue.issueId,
    action: name
  }).then(res => {

    // Преобразуем объект в массив пар ключ-значение
    const values = Object.values(res.template);

    // Ищем индекс поля с ключом 'comment'
    const commentIndex = values.findIndex((key) => key === 'comment' || key === 'optionalComment');

    // Если поле 'comment' найдено, добавляем поле 'commentPrivate' после него
    if (commentIndex !== -1) {
      values.splice(commentIndex + 1, 0, 'commentPrivate'); // Вставляем после 'comment'
    }

    // Преобразуем массив обратно в объект и сохраняем его в fields.value
    fields.value = Object.fromEntries(
        values.map((value) => [value, value === 'commentPrivate' ? true : '']))
  });
});

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
      <IssueInput :field="key" :value="fields[key]" @input="value => fields[key] = value"/>
    </IonItem>
  </IonContent>
</template>

<style scoped>

</style>