import {CommonResponseType, instance} from "./api";
import {UserType} from "../types/types";

export type GetUsersType={
    items:Array<UserType>
    totalCount:number
    error:string | null
}

export const UsersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then (res=>res.data)
    },
    deleteFollow(id: number) {
        return instance.delete<CommonResponseType<{}>>(`follow/${id}`)
            .then (res=>res.data)
    },
    postFollow(id: number) {
        return instance.post<CommonResponseType<{}>>(`follow/${id}`)
            .then (res=>res.data)
    }
};
