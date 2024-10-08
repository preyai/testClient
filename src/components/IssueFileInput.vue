<script setup lang="ts">
import {ref} from 'vue';
import {IonButton, IonItem, IonLabel, IonList, IonButtons, IonIcon} from "@ionic/vue";
import {CameraSource} from '@capacitor/camera';
import {PhotoData, useAttachments} from '@/hooks/useAttachments';
import {trash} from "ionicons/icons";

const {field, label, multiple} = defineProps<{
  field: string,
  label?: string,
  multiple?: boolean
}>()

const items = defineModel<PhotoData[]>({default: []});

const {photos, takePhoto} = useAttachments();

// const items = ref<PhotoData[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

const selectFiles = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    for (const file of Array.from(target.files)) {
      const base64Data = await convertFileToBase64(file);
      const cleanBase64Data = base64Data.split(',')[1];
      if (Array.isArray(items.value))
        items.value.push({
          name: file.name,
          type: file.type,
          body: cleanBase64Data,
          size: file.size,
          date: file.lastModified
        });
      else
        items.value = [{
          name: file.name,
          type: file.type,
          body: cleanBase64Data,
          size: file.size,
          date: file.lastModified
        }];
    }
  }
};

const convertFileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });

const capturePhoto = async () => {
  try {
    const photo = await takePhoto(5 * 1024 * 1024, CameraSource.Camera); // Пример с ограничением 5MB
    items.value.push(photo.data);
  } catch (error) {
    console.error('Ошибка при получении фото:', error);
  }
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
};

</script>

<template>
  <div>
    <div class="ion-padding-vertical">
      <IonLabel>{{ label || field }}</IonLabel>
    </div>
    <IonButtons>
      <IonButton @click="selectFiles">Выбрать файлы</IonButton>
      <IonButton @click="capturePhoto">Сделать фото</IonButton>
    </IonButtons>

    <input
        ref="fileInput"
        type="file"
        multiple
        @change="handleFileChange"
        style="display: none;"
    />

    <IonList>
      <IonItem v-for="(file, index) in items" :key="index">
        <IonLabel>
          {{ file.name }}
        </IonLabel>
        <IonButton
            fill="clear"
            slot="end"
            @click="removeItem(index)"
        >
          <IonIcon :icon="trash" slot="icon-only"></IonIcon>
        </IonButton>
      </IonItem>
    </IonList>
  </div>
</template>

<style scoped>
/* Добавьте стили по необходимости */
</style>
