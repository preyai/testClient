<script setup lang="ts">
import {onMounted, ref} from "vue";
import {
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonInput,
  IonCheckbox
} from "@ionic/vue";
import {useTtStore} from "@/stores/ttStore";

const {field} = defineProps<{
  field: string,
  value: any
}>()

const emits = defineEmits<{
  input: [value: any]
}>()

const tt = useTtStore()
const type = ref<string>()
const variants = ref<string[]>()

const onInput = (event: Event) => {
  emits('input', (event.target as HTMLInputElement).value);
};

const onChange = (event: Event) => {
  emits('input', (event.target as HTMLInputElement).checked);
};

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
  <IonInput
      v-if="type==='text'"
      :label="$t(`tt.${field}`)"
      label-placement="floating"
      :value="value"
      @input="onInput"
  />
  <IonTextarea
      v-if="type==='area'"
      :label="$t(`tt.${field}`)"
      label-placement="floating"
      :value="value"
      @input="onInput"
  />
  <IonCheckbox
      v-if="type==='checkbox'"
      label-placement="stacked"
      alignment="start"
      :checked="value"
      @ionChange="onChange"
  >
    {{ $t(`tt.${field}`) }}
  </IonCheckbox>
  <IonSelect
      v-if="type==='select'"
      :label="$t(`tt.${field}`)"
      label-placement="floating"
      :value="value"
      @ionChange="onInput"
  >
    <IonSelectOption v-for="variant in variants" :value="variant" :key="variant">{{ variant }}</IonSelectOption>
  </IonSelect>

</template>

<style scoped>

</style>