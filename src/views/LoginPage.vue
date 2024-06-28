<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/vue';
import {ref, watch} from "vue";
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore()
const {push} = useIonRouter()
const username = ref("")
const password = ref("")

const handler = () => {
  authStore.login({login: username.value, password: password.value, rememberMe: true})
}

watch(() => authStore.isAuthenticated, () => {
  console.log("123")
  push('/addresses')
})

</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>login {{authStore.isAuthenticated}}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonInput label="username" label-placement="floating" v-model="username"/>

      <IonInput label="password" label-placement="floating" type="password" v-model="password"/>

      <IonButton size="default" expand="block" @click="handler">Войти</IonButton>
    </IonContent>
  </IonPage>
</template>

<style scoped></style>