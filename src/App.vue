<script setup lang="ts">
import {IonApp, IonRouterOutlet} from '@ionic/vue';
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore();

// onMounted(() => {
//   authStore.loadAuthState();
// });
</script>

<template>
  <IonApp>
    <IonRouterOutlet/>
  </IonApp>
</template>

