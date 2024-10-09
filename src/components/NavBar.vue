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
        </template>
      </v-app-bar>
    </v-layout>
  </v-card>
</template>

<style scoped>
</style>
