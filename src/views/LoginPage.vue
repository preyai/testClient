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
  useIonRouter,
  IonCheckbox
} from '@ionic/vue';
import {ref, watch} from "vue";
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore()
const {push} = useIonRouter()
const username = ref("")
const password = ref("")
const rememberMe = ref(false)

const handler = () => {
  authStore.login({login: username.value, password: password.value, rememberMe: rememberMe.value})
      .catch(e => alert(e))
}

watch(() => authStore.isAuthenticated, () => {
  push('/addresses')
})

</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>login {{ authStore.isAuthenticated }}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent c class="ion-padding">
      <form @submit.prevent="handler" class="">
        <IonInput label="username" label-placement="floating" v-model="username"/>

        <IonInput label="password" label-placement="floating" type="password" v-model="password"/>

        <IonCheckbox v-model="rememberMe" labelPlacement="end" class="ion-padding-vertical">Remember me</IonCheckbox>

        <IonButton type="submit" size="default" expand="block">Войти</IonButton>
      </form>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

</style>