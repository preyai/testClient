<script setup lang="ts">

import {IonContent, IonList, IonPage} from "@ionic/vue";
import AddressesListItem from "@/components/AddressesListItem.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {City, getCities} from "@/api/cities";
import AddressesHeader from "@/components/AddressesHeader.vue";
import {useAddressesStore} from "@/stores/addressesStore";

const addressesStore = useAddressesStore()
const cities = ref<City[]>()

onMounted(() => {
  getCities({
    regionId: addressesStore.region?.regionId,
    areaId: addressesStore.area?.areaId
  })
      .then(result => cities.value = result)
})

onUnmounted(() => {
  addressesStore.selectCity()
})
</script>

<template>
  <IonPage>
    <AddressesHeader label="cities"/>

    <IonContent>
      <IonList>
        <AddressesListItem
            v-for="city in cities"
            :key="city.cityUuid"
            :item="city"
            label-key="cityWithType"
            :next-locations="['streets','settlements']"
            @select="addressesStore.selectCity"
        />
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>