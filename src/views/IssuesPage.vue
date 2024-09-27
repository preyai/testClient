<script setup lang="ts">

import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent
} from "@ionic/vue";
import {onMounted, ref} from "vue";
import PageHeader from "@/components/PageHeader.vue";
import {useTtStore} from "@/stores/ttStore";
import {Issue} from "@/types/tt";
import router from "@/router";
import useIssueCreate from "@/hooks/useIssueCreate";

const tt = useTtStore()
const {openActions} = useIssueCreate()

const issues = ref<Issue[]>([])
const count = ref<number>(0)
const limit = ref<number>(40)
const skip = ref<number>(0)

const load = async (event?: InfiniteScrollCustomEvent) => {
  try {
    const res = await tt.getIssues(limit.value, skip.value);
    issues.value = Number(res.skip) === 0 ? res.issues : [...issues.value, ...res.issues]
    count.value = res.count
    limit.value = Number(res.limit)
    skip.value = Number(res.skip) + limit.value
    event?.target.complete()
  } catch (e) {
    if (issues.value.length === 0)
      await router.replace('/tt')
  }
}

const handler = async (issue: Issue) => {
  await router.push(`/tt/issue?issueId=${issue.issueId}`)
}

const handleRefresh = (event: RefresherCustomEvent) => {
  skip.value = 0
  load()
      .then(() => event.target.complete())

};

onMounted(() => {
  const projectId = router.currentRoute.value.query['projectId']?.toString()
  const filter = router.currentRoute.value.query['filter']?.toString()
  if (projectId && filter) {
    tt.setProject(tt.meta?.projects.find(project => project.projectId === Number(projectId)))
    tt.setFilter(filter)
  }
  load()
})
</script>

<template>
  <IonPage>
    <PageHeader
        label="issues"
        defaultHref="/tt"
        actions
        @onActionsClick="openActions"
    />
    <IonContent>
      <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent/>
      </IonRefresher>
      <IonList v-if="issues">
        <IonItem v-for="issue of issues" :key="issue.id" @click="handler(issue)" button>
          <IonLabel>{{ issue.issueId }} - {{ issue.subject }}</IonLabel>
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