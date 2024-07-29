<script setup lang="ts">

import {IonContent, IonItem, IonLabel, IonList, IonPage} from "@ionic/vue";
import {onMounted, ref} from "vue";
import api from "@/api";
import {useTtStore} from "@/stores/ttStore";
import {Filters} from "@/types/tt";
import {key} from "ionicons/icons";

const ttStore = useTtStore()
const filters = ref<Filters>()

onMounted(() => {
  ttStore.load()
      .then(() => {
            console.log(ttStore.meta)
            filters.value = ttStore.meta?.filters
          }
      )
})

</script>

<template>
  <IonPage>
    <IonContent>
      <IonList v-if="filters">
        <IonItem v-for="key in Object.keys(filters)" :key="key">
          <IonLabel>{{ filters[key] }}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>