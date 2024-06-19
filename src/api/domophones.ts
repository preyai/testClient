import api from "@/api/index";

interface DomophoneStatus {
    status: string;
    message: string;
}

export interface Domophone {
    domophoneId: number;
    enabled: number;
    model: string;
    server: string;
    url: string;
    credentials: string;
    dtmf: string;
    firstTime: number;
    nat: number;
    locksAreOpen: number;
    comments: string;
    name: string;
    ip: string | null;
    sub_id: string | null;
    status: DomophoneStatus;
    [key: string]: any;
}

const url = 'houses/domophones';

const getDomophones = async () => {

    const data = await api.get(url)

    return data.domophones.domophones
}

export {getDomophones}