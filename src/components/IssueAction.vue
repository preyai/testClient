<script setup lang="ts">

import {
  alertController,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonTitle,
  IonToolbar,
  modalController
} from "@ionic/vue";
import {onMounted, ref} from "vue";
import api from "@/api";
import {useTtStore} from "@/stores/ttStore";
import IssueInput from "@/components/IssueInput.vue";

const {name, _fields, issue} = defineProps<{
  name: string,
  _fields?: string[],
  issue?: string | string[]
}>()

const tt = useTtStore()

const fields = ref<Record<string, any>>({});

const initFields = (labels: string[]) => {
  // Ищем индекс поля с ключом 'comment'
  const commentIndex = labels.findIndex((key) => key === 'comment' || key === 'optionalComment');

  // Если поле 'comment' найдено, добавляем поле 'commentPrivate' после него
  if (commentIndex !== -1) {
    labels.splice(commentIndex + 1, 0, 'commentPrivate'); // Вставляем после 'comment'
  }

  // Преобразуем массив обратно в объект и сохраняем его в fields.value
  fields.value = Object.fromEntries(
      labels.map((value) => [value, value === 'commentPrivate' ? true : '']))
}

const cancel = () => modalController.dismiss(null, 'cancel');

const confirm = () => {
  if (Array.isArray(issue))
    for (const id of issue)
      tt.doAction(name, fields.value, id)
          .then(() => modalController.dismiss(null, 'confirm'))
  else if (issue)
    tt.doAction(name, fields.value, issue)
        .then(() => modalController.dismiss(null, 'confirm'))
  else
    tt.doAction(name, fields.value)
        .then(() => modalController.dismiss(null, 'confirm'))
}

onMounted(
    () => {
      const id = issue ? (Array.isArray(issue) ? issue[0] : issue) : tt.issue ? tt.issue.issue.issueId : undefined;
      if (!id)
        return;

      if (_fields)
        initFields(_fields);
      else
        api.get('tt/action', {
          _id: id,
          action: name
        })
            .then(res => {
              if (typeof res.template === 'string')
                initFields([res.template]);
              else
                initFields(Object.values(res.template));

            })
            .catch((error) => {
              alertController.create({
                header: 'Что то пошло не так',
                message: error.message,
                buttons: ['Ok'],
              })
                  .then((alert) => alert.present())
            })
    });

</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">{{ $t('base.cancel') }}</IonButton>
      </IonButtons>
      <IonTitle>{{ name }}</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="confirm" :strong="true">{{ $t('base.confirm') }}</IonButton>
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