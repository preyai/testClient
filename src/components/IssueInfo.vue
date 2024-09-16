<script setup lang="ts">
import {IssueData} from "@/types/tt";
import IssueField from "@/components/IssueField.vue";
import {IonItemGroup, IonItemDivider, IonLabel} from "@ionic/vue";
import {useTtStore} from "@/stores/ttStore";
import IssueCustomField from "@/components/IssueCustomField.vue";
import {computed} from "vue";

const tt = useTtStore()
const {issue} = defineProps<{
  issue: IssueData
}>()

const groupedCustomFields = computed(() => {
  return tt.meta?.customFields.reduce((groups: Record<string, any[]>, field) => {
    const catalog = field.catalog || 'Без категории';
    if (!groups[catalog]) {
      groups[catalog] = [];
    }
    groups[catalog].push(field);
    return groups;
  }, {});
});
</script>

<template>
  <IonItemGroup>
    <IonItemDivider>
      <IonLabel>base</IonLabel>
    </IonItemDivider>
    <IssueField v-for="field of issue.fields" :issue="issue.issue" :field="field" :key="field"/>

  </IonItemGroup>
  <IonItemGroup v-for="(fields, catalog) in groupedCustomFields" :key="catalog">
    <IonItemDivider>
      <IonLabel>{{ catalog }}</IonLabel>
    </IonItemDivider>
    <IssueCustomField
        v-for="field of fields"
        :key="field.field"
        :issue="issue.issue"
        :field="field"
    />
  </IonItemGroup>
</template>

<style scoped>

</style>