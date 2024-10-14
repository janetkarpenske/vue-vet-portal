<template>
  <v-card
    class="mx-auto"
    max-width="448"
  >
    <v-layout>
      <v-app-bar
        color="rgb(54, 56, 80)"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
          <router-link
            to="/"
            style="text-decoration: none; color: inherit;"
          >
            PawPal
          </router-link>
        </v-app-bar-title>
        <template v-slot:append>
          <router-link 
            to="/about"
            style="text-decoration: none; color: inherit;"
          >
            <v-btn>
              About
            </v-btn>
          </router-link>
          <router-link
            v-if="!isAuth"
            to="/users/signin"
            style="text-decoration: none; color: inherit;"
          >
            <v-btn>
              Sign In
            </v-btn>
          </router-link>
          <router-link
            v-if="!isAuth"
            to="/users/register"
            style="text-decoration: none; color: inherit;"
          >
            <v-btn>
              Register
            </v-btn>
          </router-link>
          <v-btn v-if="isAuth" @click="handleSignOut">
            Logout
          </v-btn>
          <router-link
            v-if="isAuth"
            to="/dashboard"
            style="text-decoration: none; color: inherit;"
          >
            <v-btn>
              Dashboard
            </v-btn>
          </router-link>

        </template>
      </v-app-bar>
    </v-layout>
  </v-card>
</template>

<script setup>
import { auth } from '@/firebase/config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '@/store/userStore';

const userStoreRef = userStore();
const isAuth= ref(auth.currentUser);

const router = useRouter();
const handleSignOut = () => {
  signOut(auth);
  router.push("/");
};

onAuthStateChanged(auth,(user) => {
  //returns null if a user is authenticated, returns null if no user authenticated
  isAuth.value = user;
  console.log("Auth state from navbar: ", isAuth);
  userStoreRef.setUser(user);
})
</script> 

<style scoped>
 template {
  background: rgb(54, 56, 80);
 }
</style>
