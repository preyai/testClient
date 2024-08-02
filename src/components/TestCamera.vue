<template>
  <div>
    <input type="file" accept="image/*" capture="environment" @change="onFileChange" ref="fileInput" />
    <button @click="openCamera">Сделать фото</button>
    <img v-if="imageData" :src="imageData" alt="Фото с камеры" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';

const fileInput = ref<HTMLInputElement | null>(null);
const imageData = ref<string | null>(null);

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    imageData.value = URL.createObjectURL(file);
  }
}

function openCamera() {
  fileInput.value?.click();
}

onBeforeUnmount(() => {
  if (imageData.value) {
    URL.revokeObjectURL(imageData.value);
  }
});


</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
