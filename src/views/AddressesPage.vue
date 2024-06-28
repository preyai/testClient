<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/vue';

const router = useIonRouter()
const views = ['regions', 'areas', 'cities', 'settlements', 'streets', 'houses']

const handler = (name: string) => {
  router.push(`/addresses/${name}`)
}

</script>

<template>
  <IonPage id="addresses">
    <IonHeader>
      <IonToolbar>
        <IonTitle>addresses</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="">
      <IonList lines="full">
        <IonItem v-for="view in views" :key="view" @click="handler(view)">
          <IonLabel>{{ view }}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>

  </IonPage>

</template>

<style scoped>

</style>