<script setup lang="ts">

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar, modalController,
  IonInput
} from "@ionic/vue";
import {useTtStore} from "@/stores/ttStore";
import {computed, ref, watch} from "vue";
import {Project, Workflow} from "@/types/tt";
import IssueCatalogSelect from "@/components/IssueCatalogSelect.vue";
import api from "@/api";
import IssueInput from "@/components/IssueInput.vue";
import useIssueInput from "@/hooks/useIssueInput";

// Определяем тип для модели
type Models = Record<string, string | number | boolean>;

const tt = useTtStore()
const u = useIssueInput()

const project = ref(tt.project)
const workflow = ref<string>()
const catalog = ref<string>()

const fields = ref()
const models = ref<Models>({});

const getComponentResult = computed(() => {
  return Object.keys(fields.value).reduce<Record<string, {
    component: any;
    props: Record<string, any>;
  }>>((acc: any, key) => {
    const field = fields.value[key];
    acc[key] = u.getComponent(field);
    return acc;
  }, {});
});

const openCatalogSelect = async (e: Event) => {
  e.preventDefault()
  if (!workflow.value)
    return;
  const modal = await modalController.create({
    component: IssueCatalogSelect,
    componentProps: {
      workflow: tt.meta?.workflows[workflow.value],
      selectedItem: catalog.value,
    }
  });

  await modal.present();

  const {data, role} = await modal.onWillDismiss();

  if (role === 'confirm') {
    catalog.value = data;
  }
}

const h1 = () => {
}
const cancel = () => modalController.dismiss(null, 'cancel')

watch(catalog, () => {
  if (!workflow.value || !catalog.value)
    return;
  api.get('tt/issueTemplate', {
    _id: workflow.value,
    catalog: catalog.value,
  })
      .then(res => {
        fields.value = res.template.fields;
        Object.keys(fields.value).forEach(key => {
          models.value[key] = ''; // Инициализируем пустой строкой или другим значением по умолчанию
        });
      })
})
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">{{ $t('base.cancel') }}</IonButton>
      </IonButtons>
      <IonTitle>{{ $t('tt.createIssue') }}</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="h1" :strong="true">{{ $t('base.confirm') }}</IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonSelect
        interface="popover"
        label-placement="floating"
        :label="$t(`tt.project`)"
        v-model="project"
    >
      <IonSelectOption v-for="variant in tt.meta?.projects" :value="variant" :key="variant.projectId">
        {{
          variant.acronym
        }}
      </IonSelectOption>
    </IonSelect>

    <IonSelect
        interface="popover"
        label-placement="floating"
        :label="$t(`tt.workflow`)"
        v-model="workflow"
    >
      <IonSelectOption
          v-for="key in project?.workflows"
          :value="key"
          :key="key"
      >
        {{
          tt.meta?.workflows[key].name
        }}
      </IonSelectOption>
    </IonSelect>

    <IonInput
        readonly
        label-placement="floating"
        :label="$t(`tt.catalog`)"
        v-model="catalog"
        @click="openCatalogSelect"
    >
    </IonInput>

    <template v-for="(field,key) in fields" :key="key">
      <component
          :is="getComponentResult[key].component"
          v-bind="getComponentResult[key].props"
          v-model="models[key]"
      >
      </component>
    </template>

  </IonContent>
</template>

<style scoped>

</style>