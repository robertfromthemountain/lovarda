<template>
    <v-card class="pa-5 mt-10">
      <v-card-title>Regisztráció</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field v-model="newUser.name" label="Név" required></v-text-field>
          <v-text-field v-model="newUser.email" label="Email" required></v-text-field>
          <v-text-field v-model="newUser.password" label="Jelszó" type="password" required></v-text-field>
          <v-btn color="primary" type="submit" class="mt-4" block>Regisztráció</v-btn>
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
  const newUser = ref({ name: '', email: '', password: '' });
  
  const register = async () => {
    try {
      await axios.post('http://localhost:3000/api/register', newUser.value);
      toast.success('Sikeres regisztráció! Jelentkezz be.');
      router.push('/login');
    } catch (error) {
      console.error('Regisztrációs hiba:', error.response ? error.response.data : error.message);
      toast.error('A regisztráció nem sikerült!');
    }
  };
  </script>