export interface Meta {
    projects: Project[];
    workflows: Workflows;
    workflowLibs: string[];
    filters: Filters;
    filtersExt: FiltersExt;
    statuses: Status[];
    resolutions: Resolution[];
    customFields: CustomField[];
    roles: Role[];
    tags: any[];
    viewers: Viewer[];
    crontabs: Crontab[];
    myRoles: Record<string, number>;
    myGroups: any[];
    prints: Print[];
    favoriteFilters: any[];
}

interface Project {
    projectId: number;
    acronym: string;
    project: string;
    maxFileSize: number;
    searchSubject: number;
    searchDescription: number;
    searchComments: number;
    assigned: number;
    workflows: string[];
    filters: ProjectFilter[];
    resolutions: number[];
    customFields: number[];
    users: User[];
    groups: any[];
    viewers: any[];
    tags: any[];
}

interface ProjectFilter {
    projectFilterId: number;
    filter: string;
    personal: number;
}

interface User {
    projectRoleId: number;
    uid: number;
    roleId: number;
    level: number;
    login: string;
    byGroup: boolean;
}

interface Workflows {
    [key: string]: Workflow;
}

interface Workflow {
    name: string;
    catalog: Catalog;
}

interface Catalog {
    [key: string]: Record<string, string>;
}

export interface Filters {
    [key: string]: string;
}

interface FiltersExt {
    [key: string]: FilterExt;
}

interface FilterExt {
    name: string;
    shortName: string | null;
    sort: string | null;
    hide: string | null;
    disableCustomSort: boolean;
    pipeline: boolean;
    owner: string | null;
}

interface Status {
    statusId: number;
    status: string;
    final: number;
}

interface Resolution {
    resolutionId: number;
    resolution: string;
}

interface CustomField {
    customFieldId: number;
    catalog: string;
    type: string;
    field: string;
    fieldDisplay: string;
    fieldDescription: string | null;
    regex: string | null;
    link: string | null;
    format: string | null;
    editor: string;
    indx: string | null;
    search: string | null;
    required: string | null;
    options: any[];
}

interface Role {
    roleId: number;
    name: string;
    nameDisplay: string | null;
    level: number;
}

interface Viewer {
    filename: string;
    name: string;
    field: string;
    code: string;
}

interface Crontab {
    crontabId: number;
    crontab: string;
    projectId: number;
    filter: string;
    uid: number;
    action: string;
}

interface Print {
    printId: number;
    formName: string;
    extension: string;
    description: string;
    hasTemplate: boolean;
}

//