<script setup lang="ts">
import {IonContent, IonPage} from "@ionic/vue";
import AccountSettings from "@/components/AccountSettings.vue";
import AppSettings from "@/components/AppSettings.vue";
</script>

<template>
  <IonPage>
    <IonContent class="ion-padding">
      <AccountSettings/>
      <AppSettings/>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>