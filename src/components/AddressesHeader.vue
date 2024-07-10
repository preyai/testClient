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

const {label} = defineProps<{ label: string }>()
const emit = defineEmits<{
  onSearch: [event: SearchbarCustomEvent]
}>()
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/addresses"/>
      </IonButtons>
      <IonTitle>{{ label }}</IonTitle>
    </IonToolbar>
    <IonToolbar>
      <IonSearchbar @ionInput="emit('onSearch', $event)"/>
    </IonToolbar>
  </IonHeader>
</template>

<style scoped>

</style>