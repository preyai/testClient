<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from '@/stores/authStore';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonCheckbox,
} from '@ionic/vue';
import {useRouter} from "vue-router";

const login = ref('');
const password = ref('');
const rememberMe = ref(false);
const error = ref('');


const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  const ua = navigator.userAgent;
  const did = 'device_id_example'; // Замените на реальное устройство ID, если необходимо

  authStore.login({login: login.value, password: password.value, rememberMe: rememberMe.value, ua, did})
      .then(() => {
        router.push('/');
      })
      .catch(e => {
        error.value = e;
      })
};
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Авторизация</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonInput
          v-model="login"
          type="email"
          label="Email"
          labelPlacement="floating"
      />
      <IonInput
          v-model="password"
          type="password"
          label="Пароль"
          labelPlacement="floating"
      />
      <IonItem>
        <IonLabel>Запомнить меня</IonLabel>
        <IonCheckbox v-model="rememberMe"></IonCheckbox>
      </IonItem>
      <IonButton expand="block" @click="handleLogin">Войти</IonButton>
      {{ error }}
    </IonContent>
  </IonPage>
</template>

<style scoped>
/* Добавьте ваш CSS здесь */
</style>
