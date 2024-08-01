<script setup lang="ts">

import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage
} from "@ionic/vue";
import {nextTick, onMounted, ref} from "vue";
import PageHeader from "@/components/PageHeader.vue";
import {useTtStore} from "@/stores/ttStore";
import {DataStructure, Issue} from "@/types/tt";
import router from "@/router";

const tt = useTtStore()
const issues = ref<Issue[]>([])
const count = ref<number>(0)
const limit = ref<number>(5)
const skip = ref<number>(0)

const load = (event?: InfiniteScrollCustomEvent) => {
  tt.getIssues(limit.value, skip.value)
      .then((res) => {
        issues.value = [...issues.value, ...res.issues]
        count.value = res.count
        limit.value = Number(res.limit)
        skip.value = Number(res.skip) + limit.value
        event?.target.complete()
      })
      .catch(() => {
        router.replace('/tt')
      })
}

const handler = async (issue: Issue) => {
  tt.setIssue(issue.issueId)
  await nextTick()
  await router.push('/tt/issue')
}

onMounted(load)
</script>

<template>
  <IonPage>
    <PageHeader
        label="issues"
        defaultHref="/tt"
    />
    <IonContent>
      <IonList v-if="issues">
        <IonItem v-for="issue of issues" :key="issue.id" @click="handler(issue)" button>
          <IonLabel>{{issue.issueId}} - {{ issue.subject }}</IonLabel>
        </IonItem>
      </IonList>
      <IonInfiniteScroll v-if="skip < count" @ionInfinite="load">
        <IonInfiniteScrollContent/>
      </IonInfiniteScroll>
    </IonContent>
  </IonPage>
</template>

<style scoped>

</style>