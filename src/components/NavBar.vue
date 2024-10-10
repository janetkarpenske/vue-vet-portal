<template>
  <v-card
    class="mx-auto"
    max-width="448"
  >
    <v-layout>
      <v-app-bar
        color="primary"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>PawPal</v-app-bar-title>
        <template v-slot:append>
          <router-link to="/about">
            <v-btn>
              About
            </v-btn>
          </router-link>
          <router-link to="/users/signin">
            <v-btn>
              Sign In
            </v-btn>
          </router-link>
          <router-link to="/users/register">
            <v-btn>
              Register
            </v-btn>
          </router-link>

            <v-btn @click="handleSignOut">
              Logout
            </v-btn>

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

const isAuth= ref(auth.currentUser);
const router = useRouter();
const handleSignOut = () => {
  signOut(auth);
};

onAuthStateChanged(auth,(user) => {
  //if user is logged in, return user, if not returns null
  console.log(user);
  isAuth.value = user;
  if(!isAuth.value){
    router.push('/');
  }
})
</script> 

<style scoped>
</style>
