<script setup lang="ts">

import {IonItem, IonLabel, IonText, IonTitle} from "@ionic/vue";
import {DetailIssue} from "@/types/tt";
import dayjs from "dayjs";

const {issue, field} = defineProps<{ issue: DetailIssue, field: string }>()
// const text = Array.isArray(issue[field]) ? issue[field].join(', ') : issue[field]
let text: string;

switch (field) {
  case "created":
  case "updated":
    text = dayjs(issue[field] * 1000).format('DD.MM.YYYY HH:mm')
    break;
  default:
    text = Array.isArray(issue[field]) ? issue[field].join(', ') : issue[field]
    break;
}

</script>

<template>
  <IonItem v-if="text">
    <IonLabel>
      <h2>{{ $t(`tt.${field}`) }}</h2>
      <IonText class="filed-content ion-padding-vertical">{{ text }}</IonText>
    </IonLabel>
  </IonItem>
</template>

<style scoped>
.filed-content {
  font-size: 120%;
}
</style>