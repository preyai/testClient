<script setup lang="ts">
import {onMounted, ref} from "vue";
import {
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonInput,
} from "@ionic/vue";
import {useTtStore} from "@/stores/ttStore";

const {field} = defineProps<{
  field: string
}>()

const tt = useTtStore()
const type = ref<string>()
const variants = ref<string[]>()

onMounted(() => {
  switch (field) {
    case "subject":
      type.value = 'text';
      break;
    case "description":
    case "comment":
    case "optionalComment":
      type.value = 'area';
      break
    case "resolution":
      type.value = 'select';
      variants.value = tt.project?.resolutions
          .map(id => tt.meta?.resolutions.find(resolution => resolution.resolutionId == id)?.resolution)
          .filter((resolution): resolution is string => resolution !== undefined);
      console.log(tt)
      console.log(variants.value)
      break;
    case "status":
    case "tags":
    case "assigned":
    case "watchers":
    case "links":
    case "workflow":
      type.value = 'select';
      break;
    case "commentPrivate":
      type.value = 'checkbox';
      break;
    default:
      type.value = 'text';
  }
})
</script>

<template>
  <IonInput v-if="type==='text'" :label="field"/>
  <IonTextarea v-if="type==='area'" :label="field"/>
  <IonSelect v-if="type==='select'" :label="field">
<!--    <IonSelectOption>1</IonSelectOption>-->
<!--    <IonSelectOption>2</IonSelectOption>-->
<!--    <IonSelectOption>3</IonSelectOption>-->
    <IonSelectOption v-for="variant in variants" :value="variant" :key="variant">{{ variant }}</IonSelectOption>
  </IonSelect>

</template>

<style scoped>

</style>