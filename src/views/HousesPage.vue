<script setup lang="ts">

import {IonContent, IonList, IonPage, SearchbarCustomEvent} from "@ionic/vue";
import AddressesListItem from "@/components/AddressesListItem.vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {getHouses, House} from "@/api/houses";
import {useAddressesStore} from "@/stores/addressesStore";
import PageHeader from "@/components/PageHeader.vue";

const addressesStore = useAddressesStore()

const houses = ref<House[]>([])
const search = ref<string>()
const list = computed(() => houses.value.filter((item) => {
  if (!search.value)
    return true
  for (const itemKey in item) {
    if (item[itemKey] && item[itemKey].toString().toLowerCase().match(search.value))
      return true
  }
}))

const searchHandler = (event: SearchbarCustomEvent) => {
  search.value = event.target.value?.toLowerCase()
}

onMounted(() => {
  getHouses({
    streetId: addressesStore.street?.streetId,
    settlementId: addressesStore.settlement?.settlementId
  })
      .then(result => houses.value = result)
})

onUnmounted(() => {
  addressesStore.selectHouse()
})
</script>

<template>
  <IonPage>
    <PageHeader
        :label="$t('addresses.houses')"
        defaultHref="/addresses"
        search
        @onSearch="searchHandler"
    />
    <IonContent>
      <IonList>
        <AddressesListItem
            v-for="house in list"
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