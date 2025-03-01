<template>
    <v-card class="pa-5 mt-10">
      <v-card-title>Bejelentkezés</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="credentials.email" label="Email" required></v-text-field>
          <v-text-field v-model="credentials.password" label="Jelszó" type="password" required></v-text-field>
          <v-btn color="primary" type="submit" class="mt-4" block>Bejelentkezés</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  
  const router = useRouter();
  const toast = useToast();
  const credentials = ref({ email: '', password: '' });
  
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', credentials.value);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      toast.success('Sikeres bejelentkezés!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Bejelentkezési hiba:', error.response ? error.response.data : error.message);
      toast.error('Hibás email vagy jelszó!');
    }
  };
  </script>
  
  <style scoped>
  .v-card {
    max-width: 400px;
    margin: auto;
  }
  </style>