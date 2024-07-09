<script setup lang="ts">

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader, IonList,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import AddressesHeader from "@/components/AddressesHeader.vue";
import AddressesListItem from "@/components/AddressesListItem.vue";
import {onMounted, ref} from "vue";
import {getStreets, Street} from "@/api/streets";
import {getHouses, House} from "@/api/houses";

const houses = ref<House[]>([])

onMounted(() => {
  getHouses()
      .then(result => houses.value = result)
})
</script>

<template>
  <IonPage>
    <AddressesHeader label="houses"/>
    <IonContent>
      <IonList>
        <AddressesListItem
            v-for="house in houses"
            :key="house.houseUuid"
            :item="house"
            label-key="houseFull"
        />
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>