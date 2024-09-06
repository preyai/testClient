import {defineStore} from "pinia";
import {computed, onMounted, ref} from "vue";
import {DataStructure, IssueData, Meta, Project} from "@/types/tt";
import api from "@/api";
import {useAttachments} from "@/hooks/useAttachments";
import {alertController} from "@ionic/vue";

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

    const setIssue = async (issueId: string) => {
        try {
            const res = await getIssue(issueId);
            issue.value = res;
            if (!project.value) {
                const _project = meta.value?.projects.find(project => project.acronym === res.issue.project)
                if (_project)
                    setProject(_project);
            }
        } catch (e) {
            issue.value = undefined
            throw e
        }
    }

    const updateIssue = async () => {
        if (issue.value)
            return setIssue(issue.value.issue.issueId)
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

    const editComment = (comment: string, commentPrivate: boolean, commentIndex: number) => {
        return api.put('tt/comment', {issueId: issue.value?.issue.issueId, comment, commentPrivate, commentIndex})
    }

    const addAttachment = (attachment: any) => {

        return api.post('tt/file', {issueId: issue.value?.issue.issueId, attachments: [attachment]})
    }

    const doAction = async (action: string, set?: any) => {
        try {
            await api.put(`tt/action/${issue.value?.issue.issueId}`, {
                action,
                set
            });
            return updateIssue()
        } catch (error: any) {
            const alert = await alertController.create({
                header: 'Не удалось выполнить действие',
                message: error.message,
                buttons: ['Ok'],
            });

            await alert.present();
        }
    }

    // getters
    const getters = {
        meta: computed(() => meta.value),
        project: computed(() => project.value),
        filter: computed(() => filter.value),
        issue: computed(() => issue.value),
    }

    return {
        load,
        setProject,
        setFilter,
        setIssue,
        getIssues,
        getIssue,
        updateIssue,
        addComment,
        editComment,
        addAttachment,
        doAction,
        ...getters
    }
})