import {defineStore} from "pinia";
import {computed, onMounted, ref} from "vue";
import {DataStructure, IssueData, Meta, Project} from "@/types/tt";
import api from "@/api";
import {useAttachments} from "@/hooks/useAttachments";

export const useTtStore = defineStore('tt', () => {
    // state
    const meta = ref<Meta>()
    const project = ref<Project>()
    const filter = ref<string>()
    const issue = ref<IssueData>()
    // const tasks

    // actions
    const load = async () => {
        return api.get('tt/tt')
            .then(res => {
                meta.value = res.meta
            });
    }

    const setProject = (value?: Project) => {
        project.value = value
    }

    const setFilter = (value?: string) => {
        filter.value = value
    }

    const setIssue = (issueId: string) => {
        getIssue(issueId)
            .then(res => issue.value = res)
    }

    const getIssues = async (limit: number, skip: number): Promise<DataStructure> => {
        if (!project.value || !filter.value)
            return Promise.reject()
        try {
            const res = await api.get('tt/issues', {
                project: project.value?.acronym,
                filter: filter.value,
                skip: skip.toString(),
                limit: limit.toString()
            })

            return res.issues
        } catch (err) {
            return Promise.reject()
        }
    }

    const getIssue = async (issueId: string): Promise<IssueData> => {
        try {
            const res = await api.get(`tt/issue/${issueId}`)
            return res.issue
        } catch (err) {
            return Promise.reject()
        }
    }

    const addComment = (comment: string, commentPrivate: boolean) => {
        return api.post('tt/comment', {issueId: issue.value?.issue.issueId, comment, commentPrivate})
    }

    const addAttachment = (attachment: any) => {

        return api.post('tt/file',  {issueId: issue.value?.issue.issueId, attachments: [attachment]})
    }

    // getters
    const getters = {
        meta: computed(() => meta.value),
        project: computed(() => project.value),
        filter: computed(() => filter.value),
        issue: computed(() => issue.value),
    }

    onMounted(load)

    return {
        load,
        setProject,
        setFilter,
        setIssue,
        getIssues,
        getIssue,
        addComment,
        addAttachment,
        ...getters
    }
})