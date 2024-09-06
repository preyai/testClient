<script setup lang="ts">
import {CustomField, DetailIssue} from "@/types/tt";
import {IonItem, IonLabel, IonText} from "@ionic/vue";
import {onMounted, ref} from "vue";

const {issue, field} = defineProps<{ issue: DetailIssue, field: CustomField }>()
const text = ref<string>()


onMounted(() => {
  const value = issue[`_cf_${field.field}`]
  if (value)
    switch (field.type) {
      case "array":
        text.value = Object.values(value).join(',')
        break;
      default:
        text.value = value
        break;
    }
})

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