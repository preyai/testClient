<script setup lang="ts">

import {IonItem, IonLabel} from "@ionic/vue";
import {DetailIssue} from "@/types/tt";

const {issue, field} = defineProps<{ issue: DetailIssue, field: string }>()
const text = Array.isArray(issue[field]) ? issue[field].join(', ') : issue[field]
</script>

<template>
  <IonItem v-if="text">
    <IonLabel>
      <h1>{{ field }}</h1>
      <p>{{ text }}</p>
    </IonLabel>
  </IonItem>
</template>

<style scoped>

</style>