<script setup lang="ts">
import {IssueData} from "@/types/tt";
import IssueField from "@/components/IssueField.vue";
import {IonList} from "@ionic/vue";

const {issue} = defineProps<{
  issue: IssueData
}>()
</script>

<template>
  <IonList>
    <IssueField v-for="field of issue.fields" :issue="issue.issue" :field="field" :key="field"/>
  </IonList>
</template>

<style scoped>

</style>