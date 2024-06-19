<script setup lang="ts">

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  IonNote
} from "@ionic/vue";
import {computed, ref} from "vue";
import {Domophone} from "@/api/domophones";

const {domophone} = defineProps<{
  domophone: Domophone
}>();

const color = computed(() => {
  if (domophone.status.status === 'OK')
    return "success";
  if (domophone.status.status === 'Offline')
    return "danger";
  return "warning";
})
const isOpen = ref(false);
const updated = ref<Record<string, string>>(domophone)

const setOpen = (open: boolean) => (isOpen.value = open);

const handlerInput = (key: string, value: string) => {
  updated.value[key] = value;
}

const save = async () => {
  // await updateHouse(house.houseId, updated.value)
  isOpen.value = false;
}

</script>

<template>
  <IonItem>
    <div class="" :class="`indicator indicator-${color}`"></div>
    <IonLabel @click="setOpen(true)">{{ domophone.name }}</IonLabel>

    <IonModal :is-open="isOpen">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton @click="setOpen(false)">Cancel</IonButton>
          </IonButtons>
          <IonTitle>{{ domophone.name }}</IonTitle>
          <IonButtons slot="end">
            <IonButton :strong="true" @click="save">Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonItem v-for="key in Object.keys(domophone)" :key="key">
            <IonInput :label="key" label-placement="floating" :value="domophone[key]"
                      @input="handlerInput(key, $event.target.value)"/>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  </IonItem>
</template>

<style scoped lang="scss">
.indicator {
  background: var(--ion-color-primary);

  width: 10px;
  height: 10px;

  border-radius: 100%;

  inset-inline-start: 12px;
  top: 12px;

  margin-right: 12px;

  &-success {
    background: var(--ion-color-success);
  }

  &-danger {
    background: var(--ion-color-danger);
  }

  &-warnings {
    background: var(--ion-color-warning);
  }
}
</style>