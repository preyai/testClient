<script setup lang="ts">

import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  SearchbarCustomEvent
} from "@ionic/vue";

const {label, search = false, defaultHref = '/'} = defineProps<{
  label: string,
  search?: boolean,
  defaultHref?: string
}>()
const emit = defineEmits<{
  onSearch: [event: SearchbarCustomEvent]
}>()
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :defaultHref="defaultHref"/>
      </IonButtons>
      <IonTitle>{{ label }}</IonTitle>
    </IonToolbar>
    <IonToolbar v-if="search">
      <IonSearchbar @ionInput="emit('onSearch', $event)"/>
    </IonToolbar>
  </IonHeader>
</template>

<style scoped>

</style>