<template>
  <div>
    <!-- Lovak listázása kártyákban -->
    <v-container>
      <v-row>
        <v-col
          v-for="horse in filteredHorses"
          :key="horse.id"
          cols="4"
          md="6"
          lg="12"
        >
          <v-card class="horse-card">
            <!-- Kép bal oldalon -->
            <v-row no-gutters>
              <v-col cols="12" md="5">
                <div
                  class="image-container"
                  @click="openImage(horse.image_path)"
                >
                  <v-img
                    v-if="horse.image_path"
                    :src="`http://localhost:3000${horse.image_path}`"
                    class="horse-image"
                    cover
                  ></v-img>
                  <!-- Nagyító ikon -->
                  <div class="zoom-icon">
                    <v-icon size="48" color="white">mdi-magnify</v-icon>
                  </div>
                </div>
              </v-col>

              <!-- Szöveg a kép mellett -->
              <v-col cols="12" md="7">
                <v-card-title class="text-h3">{{ horse.name }}</v-card-title>
                <v-card-subtitle class="text-body-1"
                  >Fajta: {{ horse.breed }} -
                  {{ horse.age }} éves</v-card-subtitle
                >
                <v-card-text>
                  <p><strong>Nem:</strong> {{ horse.gender }}</p>
                  <p><strong>Szín:</strong> {{ horse.color }}</p>
                  <p><strong>Magasság:</strong> {{ horse.height }} cm</p>
                  <p><strong>Súly:</strong> {{ horse.weight }} kg</p>
                  <p><strong>Tulajdonos:</strong> {{ horse.owner }}</p>
                  <p><strong>Egészségi állapot:</strong> {{ horse.info }}</p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Lightbox a teljes méretű kép megjelenítésére -->
    <v-dialog v-model="isImageOpen" max-width="800px">
      <v-card class="lightbox-card">
        <v-btn class="close-button" icon @click="closeImage">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-img :src="selectedImage" class="full-image"></v-img>
      </v-card>
    </v-dialog>

    <!-- Üzenet, ha nincs ló az adatbázisban -->
    <v-alert v-if="filteredHorses.length === 0" type="info" class="mt-4">
      Nincs elérhető ló az adatbázisban.
    </v-alert>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import "@/styles/horse-list.css";

// Lovak adatainak tárolása
const horses = ref([]);
const isImageOpen = ref(false);
const selectedImage = ref("");

// Csak azok a lovak jelenjenek meg, amelyeknek van neve
const filteredHorses = computed(() => {
  return horses.value.filter((horse) => horse.name);
});

// A kép megnyitása amikor rákattintunk
const openImage = (imagePath) => {
  selectedImage.value = `http://localhost:3000${imagePath}`;
  isImageOpen.value = true;
};

// A kép bezárása
const closeImage = () => {
  isImageOpen.value = false;
};

// API hívás a lovak lekérésére
const fetchHorses = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/horses");
    horses.value = response.data;
  } catch (error) {
    console.error("Hiba történt az adatok lekérésekor:", error);
  }
};

// Az API hívás végrehajtása a komponens betöltésekor
onMounted(fetchHorses);
</script>

<style scoped>
</style>
