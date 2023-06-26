import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:{
    "API-KEY":"c0e1aeee-b02c-4c2b-a1ae-8791ba220fd4"}
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
    },
    putPhoto(file) {
        const formData=new FormData();
        formData.append("Image",file)
        return instance.put(`profile/photo`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    },
    putProfile(Data) {
        return instance.put(`profile`,Data)
    }
};
export const AuthAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    postLogin(email,password,rememberMe,captcha) {
        return instance.post(`auth/login`, {email,password,rememberMe,captcha})
    },
    logOut(){
        return instance.delete(`auth/login`)
    },
    getCaptcha(){
        return instance.get(`security/get-captcha-url`)
    }
};


