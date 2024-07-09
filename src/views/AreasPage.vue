<script setup lang="ts">

import {
  IonButtons,
  IonBackButton,
  IonPage,
  IonRouterOutlet,
  IonContent,
  IonToolbar,
  IonTitle,
  IonHeader, IonList, IonItem, IonLabel, useIonRouter
} from "@ionic/vue";
import {Area, getAreas} from "@/api/areas";
import {onMounted, ref} from "vue";
import AddressesListItem from "@/components/AddressesListItem.vue";
import AddressesHeader from "@/components/AddressesHeader.vue";

const router = useIonRouter()
const areas = ref<Area[]>([])

onMounted(() => {
  getAreas()
      .then(result => {
        if (result.length > 0)
          areas.value = result
        else
          router.replace('/addresses/cities')
      })
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