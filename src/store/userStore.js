import { defineStore } from "pinia";

export const userStore = defineStore('userStore',{
    state:()=>({
        user: null,
        isAdmin: true
    }),
    persist: true,
    getters:{
        getUser(state){
            return state.user
        },
        getUserIsAdmin(state){
            return state.isAdmin
        }
    },
    actions:{
        setUser(user){
            this.user = user;
        }
    }
})