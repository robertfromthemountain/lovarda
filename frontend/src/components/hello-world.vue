<template>
  <!-- Hero szekció parallax képpel -->
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
</script>

<style scoped>
/* Hero overlay */
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Sötétített overlay a szöveg olvashatósága miatt */
}

/* Hero szövegek */
.hero-title {
  font-size: 48px;
  font-weight: bold;
  color: white;
}

.hero-subtitle {
  font-size: 20px;
  color: white;
  margin-top: 10px;
}

.hero-btn {
  margin-top: 20px;
}
</style>