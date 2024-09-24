<script setup lang="ts">
import api from "@/api";
import {IonItem, IonLabel, IonText, IonProgressBar} from "@ionic/vue";
import {CustomField, DetailIssue} from "@/types/tt";
import dayjs from "dayjs";
import {computed, onMounted, ref, watch} from "vue";
import {useTtStore} from "@/stores/ttStore";

const {issue, field: _field, cf} = defineProps<{ issue: DetailIssue, field: string, cf?: CustomField }>()
// const text = Array.isArray(issue[field]) ? issue[field].join(', ') : issue[field]

const tt = useTtStore()
const text = ref<string>()
const field = computed(() => _field[0] === '*' ? _field.slice(1) : _field)

const setText = () => {

  const value = issue[field.value]
  const viewer = tt.meta?.viewers.find(v => v.field === field.value)

  if (viewer) {
    try {
      const f = new Function('value', 'issue', 'field', 'target', 'filter', 'api', 'text', viewer.code)
      text.value = f(value, issue.issueId, field, 'pwa', '', api, text)
    } catch (e) {
      text.value = value
      console.warn(e)
    }
  } else if (cf) {

    if (value)
      switch (cf.editor) {
        case "date":
          text.value = dayjs(value * 1000).format('DD.MM.YYYY')
          break;
        case "datetime-local":
          text.value = dayjs(value * 1000).format('DD.MM.YYYY HH:mm')
          break;
        default:
          text.value = value
          break;
      }
    // switch (cf.type) {
    //   case "array":
    //     text.value = Object.values(value).join(',')
    //     break;
    //   default:
    //     break;
    // }


  } else
    switch (field.value) {
      case "workflow":
        text.value = tt.meta?.workflows[value].name
        break;
      case "created":
      case "updated":
        text.value = dayjs(value * 1000).format('DD.MM.YYYY HH:mm')
        break;
      default:
        text.value = Array.isArray(value) ? value.join(', ') : value
        break;
    }
}

onMounted(setText)
watch(() => issue, setText)

</script>

<template>
  <IonItem v-if="text">
    <IonLabel>
      <h2>{{ cf?.fieldDisplay || $t(`tt.${field}`) }}</h2>
      <IonProgressBar v-if="text==='$loading$'" type="indeterminate"/>
      <IonText v-else class="filed-content ion-padding-vertical">{{ text }}</IonText>
    </IonLabel>
  </IonItem>
</template>

<style scoped>
.filed-content {
  font-size: 120%;
  white-space: pre-line;
}
</style>