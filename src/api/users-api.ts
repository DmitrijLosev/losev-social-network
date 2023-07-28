import {CommonResponseType, instance} from "./api";
import {UserType} from "../types/types";
import {FilterType} from "../Redux/Users-reducer";

export type GetUsersType={
    items:Array<UserType>
    totalCount:number
    error:string | null
}

export const UsersAPI = {

    getUsers(currentPage: number, pageSize: number,filter:FilterType) {
        return instance.get<GetUsersType>
        (`users?page=${currentPage}&count=${pageSize}`+(filter.term==="" ? "" : `&term=${filter.term}`)
            + (filter.friend===null ? "" : `&friend=${filter.friend}`))
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
