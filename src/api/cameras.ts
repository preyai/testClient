import api from "@/api/index";
import {apiItem} from "@/types/data";

interface CameraStatus {
    status: string;
    message: string;
}

export interface Camera extends apiItem {
    cameraId: number;
    enabled: number;
    model: string;
    url: string;
    stream: string;
    credentials: string;
    name: string;
    dvrStream: string;
    timezone: string;
    lat: string;
    lon: string;
    direction: string;
    angle: string;
    distance: string;
    frs: string;
    mdLeft: number;
    mdTop: number;
    mdWidth: number;
    mdHeight: number;
    common: number;
    comments: string;
    sound: number;
    ip: string | null;
    status: CameraStatus;
}

const listUrl = 'cameras/cameras';

const getCameras = async () => {

    const data = await api.get(listUrl)

    return data.cameras.cameras
}

export {getCameras}