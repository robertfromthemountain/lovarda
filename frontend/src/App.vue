<template>
  <v-app>
    <navigation />
    
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import navigation from './components/navigation.vue';
</script>
