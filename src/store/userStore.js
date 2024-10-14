import { defineStore } from "pinia";

export const userStore = defineStore('userStore',{
    state:()=>({
        user: null,
        isAdmin: false
    }),
    persist: true,
    getters:{
        getUser(state){
            return state.user
        }
    },
    actions:{
        setUser(user){
            this.user = user;
        }
    }
})