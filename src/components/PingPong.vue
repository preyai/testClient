<script setup lang="ts">
import {IonButton, IonSpinner} from "@ionic/vue";
import {computed, ref} from "vue";
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore();

const status = ref(0)

const color = computed(() => {
  if (status.value === 204)
    return 'success'
  if (status.value > 1)
    return 'danger'
  return 'primary'
})

const sendPing = () => {
  if (status.value !== 0)
    status.value = 0
  else {
    status.value = 1;
    fetch('https://rbt-demo.lanta.me/frontend/authentication/ping', {
      method: "POST",
      headers: {
        "authorization": `Bearer ${authStore.token}`,
      }
    })
        // .then((res) => res.json())
        .then((res) => {
          status.value = res.status;
        })
        .catch(res => status.value = res.status);
  }
}
</script>

<template>
  <IonButton @click="sendPing" :color="color">
    <template v-if="status === 0">
      Ping
    </template>
    <template v-else-if="status === 1">
      <IonSpinner name="dots"></IonSpinner>
    </template>
    <template v-else-if="status === 204">
      Pong
    </template>
    <template v-else>
      Wrong :(
    </template>
  </IonButton>
</template>

<style scoped>

</style>