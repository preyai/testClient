<script setup lang="ts">
import {CustomField, DetailIssue} from "@/types/tt";
import {IonItem, IonLabel, IonText} from "@ionic/vue";

const {issue, field} = defineProps<{ issue: DetailIssue, field: CustomField }>()

let text: string;

switch (field.type) {
  case "array":
    text = Object.values(issue[`_cf_${field.field}`]).join(',')
    break;
  default:
    text = issue[`_cf_${field.field}`]
    break;
}

</script>

<template>
  <IonItem v-if="text">
    <IonLabel>
      <h2>{{ field.fieldDisplay }}</h2>
      <IonText class="filed-content ion-padding-vertical">{{ text }}</IonText>
    </IonLabel>
  </IonItem>
</template>

<style scoped>
.filed-content {
  font-size: 120%;
}
</style>