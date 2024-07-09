<script setup lang="ts">

import {IonContent, IonList, IonPage} from "@ionic/vue";
import AddressesHeader from "@/components/AddressesHeader.vue";
import {onMounted, ref} from "vue";
import {getStreets, Street} from "@/api/streets";
import AddressesListItem from "@/components/AddressesListItem.vue";
import {useAddressesStore} from "@/stores/addressesStore";

const addressesStore = useAddressesStore()

const streets = ref<Street[]>([])

onMounted(() => {
  getStreets({
    cityId: addressesStore.city?.cityId,
    settlementId: addressesStore.settlement?.settlementId,
  })
      .then(result => streets.value = result)
})
</script>

<template>
  <IonPage>
    <AddressesHeader label="streets"/>
    <IonContent>
      <IonList>
        <AddressesListItem
            v-for="street in streets"
            :key="street.streetUuid"
            :item="street"
            label-key="streetWithType"
            :next-locations="['houses']"
            @select="addressesStore.selectStreet"
        />
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>