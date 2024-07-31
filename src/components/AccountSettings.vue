<script setup lang="ts">
import {IonButton, IonCard, IonInput} from "@ionic/vue";
import {useAuthStore} from "@/stores/authStore";
import {onMounted, ref} from "vue";
import api from "@/api";

interface User {
  enabled: number
  login: string
  notification: string
  phone: string
  realName: string
  uid: number
}

const authStore = useAuthStore()
const user = ref<User>()

onMounted(() => {
  api.get('user/whoAmI')
      .then(res => {
        user.value = res.user
      })
})
</script>

<template>
  <IonCard class="ion-padding grid">

    <IonInput label="username" label-placement="floating" disabled :value="user?.login"/>
    <IonInput label="realName" label-placement="floating" :value="user?.realName"/>

    <IonButton size="default" expand="block" @click="authStore.logout">Logout</IonButton>
  </IonCard>

</template>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>