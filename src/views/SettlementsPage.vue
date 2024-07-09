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
import AddressesListItem from "@/components/AddressesListItem.vue";
import {onMounted, ref} from "vue";
import {getSettlements, Settlement} from "@/api/settlements";
import AddressesHeader from "@/components/AddressesHeader.vue";

const settlements = ref<Settlement[]>([])

onMounted(() => {
  getSettlements()
      .then(result => settlements.value = result)
})

</script>

<template>
  <IonPage>
    <AddressesHeader label="settlements"/>
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