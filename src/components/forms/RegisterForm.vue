<template>
  <h1 class="header">Register</h1>
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-container width="500">
        <v-text-field
          v-model="formData.firstName"
          :counter="10"
          label="First name"
          hide-details
          required
        ></v-text-field>
        <br>
        <v-text-field
          v-model="formData.lastName"
          :counter="10"
          label="Last name"
          hide-details
          required
        ></v-text-field>
        <br>
        <v-text-field
          v-model="formData.userEmail"
          label="E-mail"
          hide-details
          required
        ></v-text-field>
        <br>
        <v-text-field
          v-model="formData.userPassword"
          type="password"
          label="Create Password"
          hide-details
          required
        ></v-text-field>
      <v-btn class="mt-2" rounded="x-large" block type="submit">Create Account</v-btn>
    </v-container>
  </v-form>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { auth } from '@/firebase/config';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const register = ref(true);
  const formData = reactive({
    firstName:'',
    lastName:'',
    userEmail:'',
    userPassword:''
  });

  const submitForm = () => {
    if(true) {
      registerNewUser();
    }
  }

  const registerNewUser = async() => {
    try{
      const response = await createUserWithEmailAndPassword(
        auth, formData.userEmail, formData.userPassword
      )
      if(!response) {
        throw newError('Sorry, something went wrong');
      }
      else {
        formData.firstName = '';
        formData.lastName = '';
        formData.userEmail = '';
        formData.userPassword = '';
        router.push('/')
      }
    }
    catch(error) {
    }
  }
</script>

<style scoped>
h1, .header {
    color: rgb(54, 58, 66);
    text-align: center;
}
</style>
