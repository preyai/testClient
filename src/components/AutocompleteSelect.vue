<script setup lang="ts" generic="T extends Record<string, any>">
import {
  CheckboxCustomEvent,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar, IonSearchbar, SearchbarCustomEvent,
  IonRadioGroup,
  IonRadio
} from "@ionic/vue";
import {ref} from "vue";

const props = defineProps<{
  items: T[],
  selectedItem?: T,
  searchableField: string,
  title: string
}>()

const emit = defineEmits<{
  (e: 'selectionCancel'): void
  (e: 'selectionChange', value: T): void
}>()

const filteredItems = ref<T[]>([...props.items]);
const workingSelectedValue = ref(props.selectedItem);

const isChecked = (value: T) => {
  return workingSelectedValue.value === value;
};

const cancelChanges = () => {
  emit('selectionCancel');
};

const confirmChanges = () => {
  emit('selectionChange', workingSelectedValue.value);
};

const searchbarInput = (ev: SearchbarCustomEvent) => {
  filterList(ev.target.value || undefined);
};

const filterList = (searchQuery: string | undefined) => {
  if (searchQuery === undefined) {
    filteredItems.value = [...props.items];
  } else {
    const normalizedQuery = searchQuery.toLowerCase();
    filteredItems.value = props.items.filter((item) => {
      return item[props.searchableField].toLowerCase().includes(normalizedQuery);
    });
  }
};

const checkboxChange = (ev: CheckboxCustomEvent) => {
  const {checked, value} = ev.detail;

  if (checked) {
    workingSelectedValue.value = value;
  } else {
    workingSelectedValue.value = undefined;
  }
};

</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="cancelChanges()">Cancel</IonButton>
      </IonButtons>
      <IonTitle>{{ $props.title }}</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="confirmChanges()">Done</IonButton>
      </IonButtons>
    </IonToolbar>
    <IonToolbar>
      <IonSearchbar @ionInput="searchbarInput($event)"></IonSearchbar>
    </IonToolbar>
  </IonHeader>

  <IonContent color="light" class="ion-padding">
    <IonRadioGroup :value="workingSelectedValue">
      <IonRadio v-for="item in filteredItems" :value="item" :key="item[searchableField]">{{ item[searchableField] }}</IonRadio>
    </IonRadioGroup>
  </IonContent>
</template>

<style scoped>

</style>