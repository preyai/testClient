<script setup lang="ts">

import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  SearchbarCustomEvent
} from "@ionic/vue";
import {ellipsisHorizontal, ellipsisVertical} from "ionicons/icons";

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
      <IonButtons slot="end">
        <IonButton>
          <IonIcon slot="icon-only" :ios="ellipsisHorizontal" :md="ellipsisVertical"></IonIcon>
        </IonButton>
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