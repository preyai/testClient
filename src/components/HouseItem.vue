<script setup lang="ts">

import {
  IonItem,
  IonLabel,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonList,
  IonInput
} from "@ionic/vue";
import {House, updateHouse} from "@/api/houses";
import {ref} from "vue";

const {house} = defineProps<{
  house: House
}>();

const isOpen = ref(false);
const updated = ref<Record<string, string>>(house)

const setOpen = (open: boolean) => (isOpen.value = open);

const handlerInput = (key: string, value: string) => {
  updated.value[key] = value;
}

const save = async () => {
  await updateHouse(house.houseId, updated.value)
  isOpen.value = false;
}

</script>

<template>
  <IonItem>
    <IonLabel @click="setOpen(true)">{{ house.houseFull }}</IonLabel>

    <IonModal :is-open="isOpen">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton @click="setOpen(false)">Cancel</IonButton>
          </IonButtons>
          <IonTitle>{{ house.houseFull }}</IonTitle>
          <IonButtons slot="end">
            <IonButton :strong="true" @click="save">Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonItem v-for="key in Object.keys(house)" :key="key">
            <IonInput :label="key" label-placement="floating" :value="house[key]"
                      @input="handlerInput(key, $event.target.value)"/>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  </IonItem>
</template>

<style scoped>

</style>