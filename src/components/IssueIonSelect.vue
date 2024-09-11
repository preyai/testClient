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

const {field, variants, multiple} = defineProps<{
  field: string,
  variants: string[],
  multiple?: boolean
}>()

const model = defineModel<string>();
console.log(field, multiple)
</script>

<template>
  <IonSelect
      label-placement="floating"
      :label="$t(`tt.${field}`)"
      v-model="model"
      :multiple="multiple"
  >
    <IonSelectOption v-for="variant in variants" :value="variant" :key="variant">{{ variant }}</IonSelectOption>
  </IonSelect>
</template>

<style scoped>

</style>