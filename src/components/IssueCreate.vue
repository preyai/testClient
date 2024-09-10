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
  IonModal
} from "@ionic/vue";
import IssueInput from "@/components/IssueInput.vue";
import {useTtStore} from "@/stores/ttStore";
import {ref} from "vue";
import {Project, Workflow} from "@/types/tt";
import AutocompleteSelect from "@/components/AutocompleteSelect.vue";

const tt = useTtStore()

const project = ref(tt.project)
const workflow = ref<Workflow>()
const catalog = ref<string>()

const getWorkflowsByProject: Workflow[] = (project: Project) => project.workflows
    .map(name => tt.meta?.workflows[name])
    .filter(i => i !== undefined)

const getCatalogsByWorkflow = (workflow: Workflow) => {

}

const h1 = () => {
}
const cancel = () => modalController.dismiss(null, 'cancel')

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
      <IonSelectOption v-for="variant in project?.workflows" :value="tt.meta?.workflows[variant]" :key="variant">
        {{
          tt.meta?.workflows[variant].name
        }}
      </IonSelectOption>
    </IonSelect>

    <IonButton
        label-placement="floating"
        :label="$t(`tt.catalog`)"
        v-model="catalog"
        id="sss"
    >
    </IonButton>
    <IonModal v-if="project" trigger="sss">
      <AutocompleteSelect title="sss" :selectedItem="workflow" searchableField="name"
                          :items="getWorkflowsByProject(project)"/>
    </IonModal>
  </IonContent>
</template>

<style scoped>

</style>