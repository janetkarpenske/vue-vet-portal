<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
    <div class="wrapper">
      <nav-bar />
      <br/>
      <div class="form">
        <register-form />
      </div>
    </div>
  </header>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'
</script>

<style scoped>
  .form {
    padding-top: 20vh;
  }
</style>
