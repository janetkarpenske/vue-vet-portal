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
          <v-btn>About</v-btn>
          <v-btn>Sign In</v-btn>
          <v-btn>Register</v-btn>
        </template>
      </v-app-bar>
    </v-layout>
  </v-card>
</template>

<style scoped>
</style>
