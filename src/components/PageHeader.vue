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
  actions?: boolean
}>()
const emit = defineEmits<{
  onSearch: [event: SearchbarCustomEvent],
  onActionsClick: [event: Event]
}>()
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton :defaultHref="defaultHref"/>
      </IonButtons>
      <IonButtons slot="end" v-if="actions">
        <IonButton @click="emit('onActionsClick', $event)">
          <IonIcon slot="icon-only" :ios="ellipsisHorizontal" :md="ellipsisVertical"></IonIcon>
        </IonButton>
      </IonButtons>
      <IonTitle>{{ label }}</IonTitle>
    </IonToolbar>
    <slot/>
    <IonToolbar v-if="search">
      <IonSearchbar @ionInput="emit('onSearch', $event)"/>
    </IonToolbar>
  </IonHeader>
</template>

<style scoped>

</style>