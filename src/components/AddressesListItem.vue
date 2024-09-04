<script setup lang="ts" generic="T extends apiItem">

import {apiItem} from "@/types/data";
import {ActionSheetButton, actionSheetController, IonItem, IonLabel, useIonRouter} from "@ionic/vue";
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const {item, labelKey, nextLocations = []} = defineProps<{
  item: T,
  labelKey: string,
  nextLocations?: string[]
}>()

const emit = defineEmits<{
  select: [item: T]
}>()

const router = useIonRouter()
const {t} = useI18n()

const label = computed(() => item[labelKey])

const buttons: ActionSheetButton[] = nextLocations.map((location) => ({
  text: t(`addresses.${location}`),
  handler() {
    emit('select', item)
    router.push(`/addresses/${location}`)
  },
}))

const presentActionSheet = async () => {
  const actionSheet = await actionSheetController.create({
    header: item[labelKey],
    buttons: [
      {
        text: t('base.edit'),
        data: {
          action: 'edit',
        },
      },
      ...buttons,
      {
        text: t('base.cancel'),
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ],
  });

  await actionSheet.present();
};
</script>

<template>
  <IonItem @click="presentActionSheet">
    <IonLabel>{{ label }}</IonLabel>
  </IonItem>
</template>

<style scoped>

</style>