<script setup lang="ts">
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/authStore';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonLabel
} from '@ionic/vue';
import PingPong from "@/components/PingPong.vue";
import {business, camera, clipboard, keypad, videocam} from "ionicons/icons";

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const goToLogin = () => {
  router.push('/login');
};

const logout = () => {
  authStore.logout()
}

</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet/>
      <IonTabBar>
        <IonTabButton tab="intercoms" href="/intercoms">
          <IonIcon :icon="keypad"/>
          <IonLabel>Domophones</IonLabel>
        </IonTabButton>
        <IonTabButton tab="addresses" href="/addresses">
          <IonIcon :icon="business"/>
          <IonLabel>Addresses</IonLabel>
        </IonTabButton>
        <IonTabButton tab="cameras" href="/cameras">
          <IonIcon :icon="videocam"/>
          <IonLabel>Cameras</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<style scoped>
/* Добавьте ваш CSS здесь */
</style>
