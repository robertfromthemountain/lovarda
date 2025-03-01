<template>
    <v-parallax src="@/assets/images/hero.jpg" height="100vh">
      <div class="overlay">
        <v-container fill-height>
          <v-row align="center" justify="center">
            <v-col class="text-center">
              <h1 class="hero-title">Üdvözlünk a Lovardában</h1>
              <p class="hero-subtitle">
                Kapcsolódj a természethez és fedezd fel a lovaglás varázsát!
              </p>
              <v-btn color="primary" class="hero-btn" large to="/horses">
                Fedezd fel lovainkat
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-parallax>
  </template>
  
<script setup>
import "@/styles/homepage/hero-section.css";
</script>

  <style scoped>
  </style>
  