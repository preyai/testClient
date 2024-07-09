<script setup lang="ts">

import {IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar} from "@ionic/vue";

const {label} = defineProps<{ label: string }>()

</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/addresses"/>
      </IonButtons>
      <IonTitle>{{ label }}</IonTitle>
    </IonToolbar>
  </IonHeader>
</template>

<style scoped>

</style>