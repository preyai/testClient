<script setup lang="ts">

import {IonContent, IonList, IonPage, IonItem, IonLabel} from "@ionic/vue";
import {ref} from "vue";

const issues = ref([])
</script>

<template>
  <IonPage>
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>