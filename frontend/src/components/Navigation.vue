<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Lovarda</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn v-for="link in middleLinks" :key="link.to" :text="link.text" :to="link.to"</v-btn>
    
    <v-spacer></v-spacer>

    <v-btn v-for="link in rightLinks" :key="link.to" :text="link.text" :to="link.to"</v-btn>

  </v-app-bar>
</template>

<script setup>
import { useNavigation } from "@/composables/useNavigation";
const { middleLinks, rightLinks } = useNavigation();
</script>

<style>
</style>