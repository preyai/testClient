<script setup lang="ts">
import {IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {business, cog, list} from "ionicons/icons";

const tabs = [
  {
    name: "addresses",
    icon: business
  },
  {
    name: "tt",
    icon: list
  },
  {
    name: "settings",
    icon: cog
  }
]
</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet/>
      <IonTabBar slot="bottom">
        <IonTabButton v-for="tab in tabs" :key="tab.name" :tab="tab.name" :href="`/${tab.name}`">
          <IonIcon :icon="tab.icon"/>
          <IonLabel>{{ tab.name }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<style scoped>
</style>