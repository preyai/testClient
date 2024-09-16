<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonInput,
  IonCheckbox
} from "@ionic/vue";
import {useTtStore} from "@/stores/ttStore";
import {Project} from "@/types/tt";


const {field, variants, label, multiple, text} = defineProps<{
  field: string,
  variants: string[],
  label?: string,
  text?: Record<string, string>,
  multiple?: boolean
}>()

const model = defineModel<string | string[]>();

onMounted(() => {
  if (multiple && !model.value)
    model.value = []
})
</script>

<template>
  <IonSelect
      label-placement="floating"
      :label="label || field"
      v-model="model"
      :multiple="multiple"
      interface="popover"
  >
    <IonSelectOption
        v-for="variant in variants"
        :value="variant"
        :key="variant"
    >
      {{ text ? text[variant] : variant }}
    </IonSelectOption>
  </IonSelect>
</template>

<style scoped>

</style>