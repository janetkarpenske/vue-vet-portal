<template>
  <h1 class="header">Sign In</h1>
    <v-form v-model="valid">
      <v-container width="500">
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
          label="Password"
          hide-details
          required
        ></v-text-field>
      <v-btn class="mt-2" rounded="x-large" block type="submit">Sign In</v-btn>
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
