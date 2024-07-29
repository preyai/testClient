<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  menuController
} from '@ionic/vue';
import {watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

watch(router.currentRoute, () => {
  menuController.close('addresses-menu')
  console.log(router.currentRoute)
})
</script>

<template>
  <IonMenu side="start" menu-id="addresses-menu" content-id="addresses">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonList>
        <IonItem router-link="/addresses/regions">
          <IonLabel>regions</IonLabel>
        </IonItem>
        <IonItem router-link="/addresses/areas">
          <IonLabel>areas</IonLabel>
        </IonItem>
        <IonItem router-link="/addresses/cities">
          <IonLabel>cities</IonLabel>
        </IonItem>
        <IonItem router-link="/addresses/settlements">
          <IonLabel>settlements</IonLabel>
        </IonItem>
        <IonItem router-link="/addresses/streets">
          <IonLabel>streets</IonLabel>
        </IonItem>
        <IonItem router-link="/addresses/houses">
          <IonLabel>houses</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
</template>

<style scoped>

</style>