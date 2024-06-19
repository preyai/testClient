<script setup lang="ts">

import {IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {Domophone, getDomophones} from "@/api/domophones";
import HouseItem from "@/components/HouseItem.vue";
import DomophoneItem from "@/components/DomophoneItem.vue";

const domophones = ref<Domophone[]>([])

onMounted(() => {
  getDomophones()
      .then(result => domophones.value = result)
})

</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Domophones</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <DomophoneItem v-for="item in domophones" :key="item.domophoneId" :domophone="item"/>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>