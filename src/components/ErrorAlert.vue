<script setup lang="ts">
import {IonAlert} from "@ionic/vue";

const {open, error, actions} = defineProps<{ open: boolean, error: string, actions: string[] }>()
</script>

<template>
  <Teleport to="body">
    <IonAlert
        :is-open="open"
        header="Error"
        :message="error"
        :buttons="actions"
    />
  </Teleport>
</template>

<style scoped>

</style>