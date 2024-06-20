<script setup lang="ts" generic="T extends apiItem">
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
  IonToolbar
} from "@ionic/vue";
import {computed, Ref, ref} from "vue";
import {apiItem} from "@/types/data";
import {ItemProps} from "@/types/items";

interface props extends ItemProps {
  item: T
}


const {item, saveItem, titleKey, disabledKeys} = defineProps<props>();

const color = computed(() => {
  if (item.status && item.status.status === 'OK')
    return "success";
  if (item.status && item.status.status === 'Offline')
    return "danger";
  return "warning";
});

const isOpen = ref(false);
const updated = ref<Record<string, string>>({...item});

const setOpen = (open: boolean) => {
  isOpen.value = open;
};

const handlerInput = (key: string, value: string) => {
  updated.value[key] = value;
};

const save = async () => {
  await saveItem(updated.value);
  isOpen.value = false;
};
</script>

<template>
  <IonItem>
    <div v-if="(item as T).status" :class="`indicator indicator-${color}`"></div>
    <IonLabel @click="setOpen(true)">{{ (item as T)[titleKey] }}</IonLabel>

    <IonModal :is-open="isOpen">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton @click="setOpen(false)">Cancel</IonButton>
          </IonButtons>
          <IonTitle>{{ (item as T)[titleKey] }}</IonTitle>
          <IonButtons slot="end">
            <IonButton :strong="true" @click="save">Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonItem v-for="key in Object.keys(item as T)" :key="key">
            <IonInput
                v-if="key !== 'status'"
                :label="key"
                label-placement="floating"
                :value="(item as T)[key]"
                :disabled="disabledKeys && disabledKeys.includes(key)"
                @input="handlerInput(key, $event.target.value)"
            />
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

  &-warning {
    background: var(--ion-color-warning);
  }
}
</style>
