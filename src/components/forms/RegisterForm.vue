<template>
  <h1 class="header">Register</h1>
    <v-form v-model="valid">
      <v-container width="500">
        <v-text-field
          v-model="firstname"
          :counter="10"
          :rules="nameRules"
          label="First name"
          hide-details
          required
          clearable
        ></v-text-field>
        <br>
        <v-text-field
          v-model="lastname"
          :counter="10"
          :rules="nameRules"
          label="Last name"
          hide-details
          required
        ></v-text-field>
        <br>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          hide-details
          required
        ></v-text-field>
        <br>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Create Password"
          hide-details
          required
        ></v-text-field>
      <v-btn class="mt-2" rounded="x-large" block type="submit">Create Account</v-btn>
    </v-container>
  </v-form>
</template>

<script setup>

</script>

<style scoped>
h1, .header {
    color: rgb(54, 58, 66);
    text-align: center;
}
</style>
