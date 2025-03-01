<template>
  <v-container class="contact-section">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <!-- Kapcsolatfelvételi rész -->
        <div class="contact-form">
          <h2 class="section-title">Lépj kapcsolatba velünk</h2>
          <p class="section-text">
            Ha kérdésed van, vagy időpontot szeretnél foglalni, töltsd ki az
            alábbi űrlapot!
          </p>
          <v-form ref="form" v-model="isValid">
            <v-text-field
              label="Név"
              v-model="name"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>
            <v-textarea
              label="Üzenet"
              v-model="message"
              :rules="[rules.required]"
              required
            ></v-textarea>
            <v-btn
              color="primary"
              class="mt-4"
              :disabled="loading"
              @click="submitForm"
            >
              <v-progress-circular
                v-if="loading"
                indeterminate
                size="20"
              ></v-progress-circular>
              <span v-else>Küldés</span>
            </v-btn>
          </v-form>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <!-- Google Térkép beágyazása -->
        <div class="map-container">
          <h2 class="section-title">Hol találsz minket?</h2>
          <iframe
            width="100%"
            height="350"
            frameborder="0"
            style="border: 0"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1410.9568429670562!2d21.228210263428572!3d46.62951662960392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745d6912e572a0b%3A0xe643b29f4ae1ba5a!2sGyula!5e1!3m2!1shu!2shu!4v1740841678542!5m2!1shu!2shu"
          ></iframe>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const name = ref("");
const email = ref("");
const message = ref("");
const isValid = ref(false);
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const toast = useToast();

const rules = {
  required: (v) => !!v || "Kötelező mező",
  email: (v) => /.+@.+\..+/.test(v) || "Érvényes e-mail címet adj meg",
};

const submitForm = async () => {
  if (!isValid.value) {
    errorMessage.value = "Kérlek, töltsd ki az összes mezőt megfelelően!";
    return;
  }

  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    const response = await axios.post("http://localhost:3000/api/messages", {
      name: name.value,
      email: email.value,
      message: message.value,
    });

    toast.success(response.data.message || "Üzenet sikeresen elküldve!");

    successMessage.value = response.data.message;
    name.value = "";
    email.value = "";
    message.value = "";
  } catch (error) {
    errorMessage.value = "Hiba történt az üzenet elküldésekor.";
    toast.error("Hiba történt az üzenet küldésekor. Kérlek, próbáld újra.");
    console.error("API hiba:", error);
  } finally {
    loading.value = false;
  }
};
</script>
  
  <style scoped>
.contact-section {
  padding: 40px 0;
}

.contact-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.map-container {
  text-align: center;
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
  