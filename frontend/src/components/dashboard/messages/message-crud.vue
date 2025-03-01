<template>
  <v-container>
    <h2 class="section-title">Beérkezett üzenetek</h2>

    <!-- Ha nincs üzenet -->
    <v-alert v-if="messages.length === 0" type="info">
      Jelenleg nincs beérkezett üzenet.
    </v-alert>

    <!-- Üzenetek táblázat -->
    <v-table v-else class="messages-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Név</th>
          <th>Email</th>
          <th>Üzenet</th>
          <th>Dátum</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="message in messages" :key="message.id">
          <td>{{ message.id }}</td>
          <td>{{ message.name }}</td>
          <td>{{ message.email }}</td>
          <td>{{ message.message }}</td>
          <td>{{ formatDate(message.created_at) }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
  
  <script setup>
import "@/styles/dashboard/messages/message-crud.css";
import { ref, onMounted } from "vue";
import axios from "axios";

const messages = ref([]);

// API hívás az üzenetek lekérésére
const fetchMessages = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/messages");
    messages.value = response.data;
  } catch (error) {
    console.error("Hiba az üzenetek lekérésekor:", error);
  }
};

// Dátum formázása (YYYY-MM-DD HH:MM)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Az API hívás végrehajtása a komponens betöltésekor
onMounted(fetchMessages);
</script>
  
  <style scoped>
</style>
  