<script setup lang="ts">

import {IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar} from "@ionic/vue";
import {computed, onMounted, ref} from "vue";
import {Domophone, getDomophones} from "@/api/domophones";
import DomophoneItem from "@/components/DomophoneItem.vue";

const domophones = ref<Domophone[]>([])
const query = ref("")
const filteredDomophones = computed(() => {
  if (!query.value)
    return domophones.value
  return domophones.value.filter(domophone => domophone.name.toLowerCase().match(query.value.toLowerCase()))
})

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
      <IonToolbar>
        <IonSearchbar v-model="query"/>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <DomophoneItem v-for="item in filteredDomophones" :key="item.domophoneId" :domophone="item"/>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>