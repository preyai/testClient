<script setup lang="ts">

import {IonContent, IonList, IonPage} from "@ionic/vue";
import {onMounted, onUnmounted, ref} from "vue";
import {getRegions, Region} from "@/api/regions";
import AddressesListItem from "@/components/AddressesListItem.vue";
import {useAddressesStore} from "@/stores/addressesStore";
import PageHeader from "@/components/PageHeader.vue";

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
    <PageHeader
        :label="$t('addresses.regions')"
        defaultHref="/addresses"
        search
    />
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