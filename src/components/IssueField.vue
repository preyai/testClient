<script setup lang="ts">
import {IonItem, IonLabel, IonProgressBar, IonText} from "@ionic/vue";
import {CustomField, DetailIssue} from "@/types/tt";
import dayjs from "dayjs";
import {computed, inject, onMounted, ref, watch} from "vue";
import {useTtStore} from "@/stores/ttStore";
import {useI18n} from "vue-i18n";
import useViewers, {UseViewers} from "@/hooks/useViewers";


const {issue, field: _field, cf, _value} = defineProps<{
  issue: DetailIssue,
  field: string,
  cf?: CustomField,
  _value?: any
}>()

const tt = useTtStore()
const {t} = useI18n()
const text = ref<string | undefined>()
const field = computed(() => _field[0] === '*' ? _field.slice(1) : _field)
const viewers = inject<UseViewers>('viewers') || useViewers()


const setText = () => {
  const value = _value || issue[field.value]
  const viewer = tt.meta?.viewers.find(v => v.field === field.value)

  if (viewer) {
    try {
      const _viewer = viewers.getViewer(viewer.code)
      text.value = _viewer(value, issue, field.value, text)
    } catch (e) {
      text.value = value
      console.warn(viewer.filename,e)
    }
  } else if (cf) {

    if (value)
      switch (cf.editor) {
        case "date":
          text.value = dayjs.unix(value).format('DD.MM.YYYY')
          break;
        case "datetime-local":
          text.value = dayjs.unix(value).format('DD.MM.YYYY HH:mm')
          break;
        case "noyes":
          text.value = Number(value) ? t('base.yes') : t('base.no')
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
        text.value = dayjs.unix(value).format('DD.MM.YYYY HH:mm')
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
      <IonText v-else class="filed-content ion-padding-vertical">
        <div v-html="text"></div>
      </IonText>

    </IonLabel>
  </IonItem>
</template>

<style scoped>
</style>