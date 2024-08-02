import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {ref} from "vue";

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}

export const usePhotoGallery = () => {
    const photos = ref<UserPhoto[]>([]);
    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const fileName = Date.now() + '.jpeg';
        const savedFileImage = {
            filepath: fileName,
            webviewPath: photo.webPath,
        };

        photos.value = [savedFileImage, ...photos.value];
    };

    return {
        photos,
        takePhoto,
    };
};