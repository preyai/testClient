<script setup lang="ts">
import {
  CheckboxCustomEvent,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonSelectOption,
  IonTitle,
  IonToolbar, IonSearchbar, SearchbarCustomEvent,
  IonRadioGroup,
  IonRadio, IonItemDivider, IonLabel, modalController
} from "@ionic/vue";
import {computed, ref} from "vue";
import {Workflow} from "@/types/tt";

interface Catalog {
  value: string,
  disabled: boolean,
}

const props = defineProps<{
  workflow: Workflow,
  selectedItem?: string
}>()

const getCatalogsByWorkflow = (workflow: Workflow) => {
  const catalogs = []
  for (const key in workflow.catalog) {
    catalogs.push({
      value: key,
      disabled: true
    })
    for (const id in workflow.catalog[key]) {
      catalogs.push({
        value: workflow.catalog[key][id],
        disabled: false
      })
    }
  }
  return catalogs
}

const items = computed<Catalog[]>(() => getCatalogsByWorkflow(props.workflow))

const filteredItems = ref<Catalog[]>([...items.value]);
const workingSelectedValue = ref(props.selectedItem);

const cancelChanges = () => {
  modalController.dismiss(null, 'cancel')
};

const confirmChanges = () => {
  modalController.dismiss(workingSelectedValue.value, 'confirm')
};

const searchbarInput = (ev: SearchbarCustomEvent) => {
  filterList(ev.target.value || undefined);
};

const filterList = (searchQuery: string | undefined) => {
  if (searchQuery === undefined) {
    filteredItems.value = [...items.value];
  } else {
    const normalizedQuery = searchQuery.toLowerCase();
    filteredItems.value = items.value.filter((item) => {
      return item.value.toLowerCase().includes(normalizedQuery);
    });
  }
};

</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="cancelChanges()">{{ $t('base.cancel') }}</IonButton>
      </IonButtons>
      <IonTitle>{{ $t('tt.workflow') }}</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="confirmChanges()">{{ $t('base.confirm') }}</IonButton>
      </IonButtons>
    </IonToolbar>
    <IonToolbar>
      <IonSearchbar @ionInput="searchbarInput($event)"></IonSearchbar>
    </IonToolbar>
  </IonHeader>

  <IonContent color="light" class="ion-padding">
    <IonList>
      <IonRadioGroup v-model="workingSelectedValue">
        <template v-for="item in filteredItems" :key="item.value">
          <IonItemDivider v-if="item.disabled">
            <IonLabel>{{ item.value }}</IonLabel>
          </IonItemDivider>
          <IonItem v-else>
            <IonRadio :value="item.value">
              {{ item.value }}
            </IonRadio>
          </IonItem>
        </template>
      </IonRadioGroup>
    </IonList>
  </IonContent>
</template>

<style scoped>

</style>