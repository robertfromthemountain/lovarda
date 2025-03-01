<template>
  <div class="index-page">
    <!-- Parallax Hero -->
    <HeroSection />

    <!-- Fő tartalom szekciók -->
    <AboutSection />
    <ServicesSection />
    <ContactSection />
  </div>
</template>

<script setup>
import HeroSection from "@/components/homepage/hero.vue";
import AboutSection from "@/components/homepage/about.vue";
import ServicesSection from "@/components/homepage/services.vue";
import ContactSection from "@/components/homepage/contact.vue";
</script>

<style scoped>
/* Az egész oldal */
.index-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style>
