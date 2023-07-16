import {CommonResponseType, instance} from "./api";
import {PhotosType, ProfileType} from "../types/types";

type PutPhotosType={
    photos:PhotosType
}
export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then (res=>res.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then (res=>res.data)
    },
    putUserStatus(status: string) {
        return instance.put<CommonResponseType<{}>>(`profile/status`, {status: status})
            .then (res=>res.data)
    },
    putPhoto(file: File) {
        const formData = new FormData();
        formData.append("Image", file)
        return instance.put<CommonResponseType<PutPhotosType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then (res=>res.data)
    },
    putProfile(Data: ProfileType) {
        return instance.put<CommonResponseType<{}>>(`profile`, Data)
            .then (res=>res.data)
    }
};

