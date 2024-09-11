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

const {field} = defineProps<{
  field: string,
  multiple?: boolean
}>()

const model = defineModel<string>();

</script>

<template>
  <component
      :is="multiple?IonTextarea:IonInput"
      label-placement="floating"
      :label="$t(`tt.${field}`)"
      v-model:value="model"
  />
</template>

<style scoped>

</style>