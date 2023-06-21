import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})
export const UsersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    deleteFollow(id) {
        return instance.delete(`follow/${id}`)
    },
    postFollow(id) {
        return instance.post(`follow/${id}`)
    }
};
export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateUserStatus(status) {
        return instance.put(`profile/status`, {status:status})
    }
};
export const AuthAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    postLogin(email,password,rememberMe) {
        return instance.post(`auth/login`, {email,password,rememberMe})
    },
    logOut(){
        return instance.delete(`auth/login`)
    }
};


