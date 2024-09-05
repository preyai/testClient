<script setup lang="ts">
import {IssueData} from "@/types/tt";
import IssueField from "@/components/IssueField.vue";
import {IonItemGroup, IonItemDivider, IonLabel} from "@ionic/vue";
import {useTtStore} from "@/stores/ttStore";
import IssueCustomField from "@/components/IssueCustomField.vue";

const tt = useTtStore()
const {issue} = defineProps<{
  issue: IssueData
}>()
</script>

<template>
  <IonItemGroup>
    <IonItemDivider>
      <IonLabel>base</IonLabel>
    </IonItemDivider>
    <IssueField v-for="field of issue.fields" :issue="issue.issue" :field="field" :key="field"/>

  </IonItemGroup>
  <IonItemGroup>
    <IonItemDivider>
      <IonLabel>custom</IonLabel>
    </IonItemDivider>
    <IssueCustomField
        v-for="field of tt.meta?.customFields"
        :key="field.field"
        :issue="issue.issue"
        :field="field"
    />
  </IonItemGroup>
</template>

<style scoped>

</style>