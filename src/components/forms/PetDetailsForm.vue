<template>
  <h1 class="header">Pet Name Here</h1>
  <v-form v-model="valid">
    <v-container width="500">
      <v-text-field
        v-model="firstname"
        :counter="10"
        :rules="nameRules"
        label="Pet Name"
        hide-details
        required
        clearable
      ></v-text-field>
      <br>
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
