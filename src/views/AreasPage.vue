<script setup lang="ts">

import {IonContent, IonList, IonPage, useIonRouter} from "@ionic/vue";
import {Area, getAreas} from "@/api/areas";
import {onMounted, onUnmounted, ref} from "vue";
import AddressesListItem from "@/components/AddressesListItem.vue";
import AddressesHeader from "@/components/AddressesHeader.vue";
import {useAddressesStore} from "@/stores/addressesStore";

const addressesStore = useAddressesStore()
const areas = ref<Area[]>([])
const search = ref<string>()

onMounted(() => {
  getAreas({
    regionId: addressesStore.region?.regionId
  })
      .then(result => {
        areas.value = result
      })
})

onUnmounted(() => {
  addressesStore.selectArea()
})


</script>

<template>
  <IonPage>
    <AddressesHeader label="areas"/>
    <IonContent>
      <IonList>
        <AddressesListItem
            v-for="area in areas"
            :key="area.areaUuid"
            :item="area"
            label-key="areaWithType"
            :next-locations="['cities','settlements']"
        />
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>