<template>
    <v-app>
      <v-main>
        <v-container>
          <h1 class="text-h4 mb-4">Lovak Kezelése</h1>
  
          <!-- Új ló hozzáadása form -->
          <v-form @submit.prevent="addHorse">
            <v-text-field label="Név" v-model="newHorse.name" required></v-text-field>
            <v-text-field label="Fajta" v-model="newHorse.breed"></v-text-field>
            <v-text-field label="Kor" v-model="newHorse.age" type="number"></v-text-field>
            <v-text-field label="Nem" v-model="newHorse.gender"></v-text-field>
            <v-text-field label="Szín" v-model="newHorse.color"></v-text-field>
            <v-text-field label="Magasság (cm)" v-model="newHorse.height" type="number"></v-text-field>
            <v-text-field label="Súly (kg)" v-model="newHorse.weight" type="number"></v-text-field>
            <v-textarea label="Egészségi információk" v-model="newHorse.info"></v-textarea>
            <v-text-field label="Születési dátum" v-model="newHorse.birth_date" type="date"></v-text-field>
            <v-text-field label="Tulajdonos" v-model="newHorse.owner"></v-text-field>
            <v-file-input label="Kép feltöltése" v-model="newHorse.image"></v-file-input>
            <v-btn color="primary" type="submit">Ló hozzáadása</v-btn>
          </v-form>
  
          <v-divider class="my-6"></v-divider>
  
          <!-- Lovak listázása -->
          <v-list>
            <v-list-item v-for="horse in filteredHorses" :key="horse.id">
              <v-list-item-content>
                <v-list-item-title>{{ horse.name }} ({{ horse.breed }}) - {{ horse.age }} éves</v-list-item-title>
                <v-list-item-subtitle>Nem: {{ horse.gender }}, Szín: {{ horse.color }}, Magasság: {{ horse.height }} cm, Súly: {{ horse.weight }} kg</v-list-item-subtitle>
                <v-list-item-subtitle>Tulajdonos: {{ horse.owner }}</v-list-item-subtitle>
                <v-list-item-subtitle>Egészségi állapot: {{ horse.info }}</v-list-item-subtitle>
                <v-img v-if="horse.image_path" :src="`http://localhost:3000${horse.image_path}`" max-width="150"></v-img>
              </v-list-item-content>
              <v-btn color="error" @click="deleteHorse(horse.id)">Törlés</v-btn>
            </v-list-item>
          </v-list>
  
          <!-- Üzenet, ha nincs ló az adatbázisban -->
          <v-alert v-if="filteredHorses.length === 0" type="info" class="mt-4">
            Nincs elérhető ló az adatbázisban.
          </v-alert>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import axios from "axios";
  
  const horses = ref([]);
  const newHorse = ref({
    name: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    height: "",
    weight: "",
    info: "",
    birth_date: "",
    owner: "",
    image: null,
  });
  
  // Computed property: csak azok a lovak, amelyeknek van neve
  const filteredHorses = computed(() => {
    return horses.value.filter(horse => horse.name);
  });
  
  // Lovak lekérése az API-ból
  const fetchHorses = async () => {
    const response = await axios.get('http://localhost:3000/api/horses');
    horses.value = response.data;
  };
  
  onMounted(fetchHorses);
  
  // Új ló hozzáadása
  const addHorse = async () => {
    const formData = new FormData();
    Object.keys(newHorse.value).forEach(key => {
      if (newHorse.value[key]) {
        formData.append(key, newHorse.value[key]);
      }
    });
  
    await axios.post("http://localhost:3000/api/horses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  
    newHorse.value = {
      name: "",
      breed: "",
      age: "",
      gender: "",
      color: "",
      height: "",
      weight: "",
      info: "",
      birth_date: "",
      owner: "",
      image: null,
    };
    fetchHorses();
  };
  
  // Ló törlése
  const deleteHorse = async (id) => {
    await axios.delete(`http://localhost:3000/api/horses/${id}`);
    fetchHorses();
  };
  </script>
  
  <style scoped>
  .v-container {
    max-width: 600px;
    margin: auto;
  }
  </style>
  