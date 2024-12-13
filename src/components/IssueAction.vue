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
import {computed, onMounted, ref} from "vue";
import api from "@/api";
import {useTtStore} from "@/stores/ttStore";
import IssueInput from "@/components/IssueInput.vue";
import useIssueInput from "@/hooks/useIssueInput";

type Models = Record<string, any>;

const {name, _fields, issue} = defineProps<{
  name: string,
  _fields?: string[],
  issue?: string | string[]
}>()

const tt = useTtStore()
const inputs = useIssueInput()

const models = ref<Models>({});

const getComponentResult = computed(() => {
  return Object.keys(models.value).reduce<Record<string, {
    component: any;
    props: Record<string, any>;
  }>>((acc: any, key) => {
    acc[key] = inputs.getComponent(key, tt.project);
    return acc;
  }, {});
});

const initFields = (labels: string[]) => {
  // Ищем индекс поля с ключом 'comment'
  const commentIndex = labels.findIndex((key) => key === 'comment' || key === 'optionalComment');

  // Если поле 'comment' найдено, добавляем поле 'commentPrivate' после него
  if (commentIndex !== -1) {
    labels.splice(commentIndex + 1, 0, 'commentPrivate'); // Вставляем после 'comment'
  }

  // Преобразуем массив обратно в объект и сохраняем его в fields.value
  models.value = Object.fromEntries(
      labels.map((value) => [value, value === 'commentPrivate' ? true : '']))
}

const cancel = () => modalController.dismiss(null, 'cancel');

const confirm = () => {
  if (Array.isArray(issue))
    for (const id of issue)
      tt.doAction(name, models.value, id)
          .then(() => modalController.dismiss(null, 'confirm'))
  else if (issue)
    tt.doAction(name, models.value, issue)
        .then(() => modalController.dismiss(null, 'confirm'))
  else
    tt.doAction(name, models.value)
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
  <IonContent v-if="models" class="ion-padding">
    <IonItem v-for="(field,key) in models" :key="key">
      <component
          :is="getComponentResult[key].component"
          v-bind="getComponentResult[key].props"
          v-model="models[field]"
      />
    </IonItem>
  </IonContent>
</template>

<style scoped>

</style>