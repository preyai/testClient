<script setup lang="ts">

import {IonBackButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import {onMounted, onUnmounted, ref} from "vue";
import {getRegions, Region} from "@/api/regions";
import AddressesListItem from "@/components/AddressesListItem.vue";
import AddressesHeader from "@/components/AddressesHeader.vue";
import {useAddressesStore} from "@/stores/addressesStore";

const addressesStore = useAddressesStore()

const regions = ref<Region[]>([])

const {selectRegion} = useAddressesStore()

onMounted(() => {
  getRegions()
      .then(result => regions.value = result)
})

onUnmounted(()=>{
  addressesStore.selectRegion()
})
</script>

<template>
  <IonPage>
    <AddressesHeader label="regions"/>
    <IonContent>
      <IonList>
        <AddressesListItem
            v-for="region in regions"
            :key="region.regionUuid"
            :item="region"
            label-key="regionWithType"
            :next-locations="['areas','cities']"
            @select="selectRegion"
        />
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>