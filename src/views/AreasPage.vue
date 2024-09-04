<script setup lang="ts">

import {IonContent, IonList, IonPage} from "@ionic/vue";
import {Area, getAreas} from "@/api/areas";
import {onMounted, onUnmounted, ref} from "vue";
import AddressesListItem from "@/components/AddressesListItem.vue";
import {useAddressesStore} from "@/stores/addressesStore";
import PageHeader from "@/components/PageHeader.vue";

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
    <PageHeader
        :label="$t('addresses.areas')"
        defaultHref="/addresses"
        search
    />
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