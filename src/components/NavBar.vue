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
import { auth, DB } from '@/firebase/config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '@/store/userStore';

const userStoreRef = userStore();
const isAuth= ref(auth.currentUser);
const userPets = ref([]);

const router = useRouter();
const handleSignOut = () => {
  signOut(auth);
  router.push("/");
};

onAuthStateChanged (auth, (user) => {
  isAuth.value = user;
  userStoreRef.setUser(user);
  if(user != null) {
    getUserPets(user.uid);
    getUserProfile(user.uid);
  }
  else {
    //need to clear user data and pet data from stores
  };
})

async function getUserPets(userID) {
  const q = query(collection(DB, "userPets"), where("upUserID", "==", userID));

  const querySnapshot = await getDocs(q);
  querySnapshot?.forEach((doc) => {
  //console.log(doc.id, " => ", doc.data().upName);
  //Set pets in store here in future
  });
}

async function getUserProfile(userID) {
  //in future, retrive full user data and set in store
}
</script> 

<style scoped>
 template {
  background: rgb(54, 56, 80);
 }
</style>
