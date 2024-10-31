<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/vue';
import { ref, watch } from "vue";

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
  push('/')
})

</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{{ $t('base.authorization') }}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent c class="ion-padding">
      <form @submit.prevent="handler" class="">
        <IonInput :label="$t('authorization.username')" label-placement="floating" v-model="username"/>

        <IonInput :label="$t('authorization.password')" label-placement="floating" type="password" v-model="password"/>

        <IonCheckbox v-model="rememberMe" labelPlacement="end" class="ion-padding-vertical">
          {{ $t('authorization.rememberMe') }}
        </IonCheckbox>

        <IonButton type="submit" size="default" expand="block">{{ $t('authorization.login') }}</IonButton>
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