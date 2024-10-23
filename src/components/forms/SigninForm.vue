<template>
  <h1 class="header">Sign In</h1>
    <v-form @submit.prevent="submitForm">
      <v-container width="500">
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
          label="Password"
          hide-details
          required
        ></v-text-field>
      <v-btn class="mt-2" rounded="x-large" block type="submit">Sign In</v-btn>
    </v-container>
  </v-form>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { auth } from '@/firebase/config';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const formData = reactive({
    userEmail:'',
    userPassword:''
  });

  const submitForm = () => {
    if(true) {
      signInUser();
    }
  }

  const signInUser = async() => {
    try{
      const response = await signInWithEmailAndPassword(
        auth, formData.userEmail, formData.userPassword
      )
      if(!response) {
        throw newError('Sorry, something went wrong');
      }
      else {
        formData.userEmail = '';
        formData.userPassword = '';
        router.push('/dashboard');
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
