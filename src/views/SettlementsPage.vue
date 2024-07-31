<script setup lang="ts">

import {IonContent, IonList, IonPage} from "@ionic/vue";
import AddressesListItem from "@/components/AddressesListItem.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {getSettlements, Settlement} from "@/api/settlements";
import {useAddressesStore} from "@/stores/addressesStore";
import PageHeader from "@/components/PageHeader.vue";

const addressesStore = useAddressesStore()

const settlements = ref<Settlement[]>([])

onMounted(() => {
  getSettlements({
    areaId: addressesStore.area?.areaId,
    cityId: addressesStore.city?.cityId
  })
      .then(result => settlements.value = result)
})
onUnmounted(() => {
  addressesStore.selectSettlement()
})
</script>

<template>
  <IonPage>
    <PageHeader
        label="settlements"
        defaultHref="/addresses"
        search
    />
    <IonContent>
      <IonList>
        <AddressesListItem
            v-for="settlement in settlements"
            :key="settlement.settlementUuid"
            :item="settlement"
            label-key="settlementWithType"
            :next-locations="['streets','houses']"
        />
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>