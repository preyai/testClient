<script setup lang="ts">
import {IonContent, IonHeader, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar} from "@ionic/vue";
import {computed, onMounted, ref} from "vue";
import {getHouses, House} from "@/api/houses";
import HouseItem from "@/components/HouseItem.vue";


const houses = ref<House[]>([])
const query = ref("")
const filteredHouses = computed(() => {
  if (!query.value)
    return houses.value
  return houses.value.filter(house => house.houseFull.toLowerCase().match(query.value.toLowerCase()))
})

onMounted(() => {
  getHouses()
      .then(result => houses.value = result)
})

</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Addresses</IonTitle>
      </IonToolbar>
      <IonToolbar>
        <IonSearchbar v-model="query"/>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <HouseItem v-for="item in filteredHouses" :key="item.houseId" :house="item"/>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>