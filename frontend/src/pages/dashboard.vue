<template>
  <v-app>
    <!-- Oldalsó navigációs sáv -->
    <v-navigation-drawer app v-model="drawer" :rail="rail" permanent>
      <v-list>
        <v-list-item>
          <h1 v-if="!isMobile">{{ dashboardTitle }}</h1>
          <v-icon v-else size="32">mdi-view-dashboard</v-icon>
          <template v-slot:append>
            <v-btn
              v-if="!isMobile"
              :icon="chevronIcon"
              variant="text"
              @click.stop="toggleDrawer()"
            ></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>

        <!-- Menüelemek -->
        <v-list-item
          v-for="item in dashboardLinks"
          :key="item.text"
          :to="item.to"
          link
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-list-item-icon>
                <v-icon>{{ item.icon }} </v-icon>
              </v-list-item-icon>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Tartalom -->
    <v-main>
      <v-container>
        <h1 class="dashboard-title">Üdvözlünk az Admin Dashboardon!</h1>
        <p>
          Itt kezelheted a lovarda összes fontos adatát, beleértve a beérkező
          üzeneteket, a lovakat és a felhasználói regisztrációkat.
        </p>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import "@/styles/dashboard/dashboard-main.css";
import { ref, watch, onMounted, onUnmounted, watchEffect } from "vue";
import { useNavigation } from "@/composables/useNavigation";

const drawer = ref(true);
const rail = ref(false);
const chevronIcon = ref("mdi-chevron-left"); // Alapértelmezett ikon balra
const dashboardTitle = ref("Dashboard");
const windowWidth = ref(window.innerWidth); // **Ablakméret figyelése**
const mobileBreakpoint = 960; // **A pont, ahol a drawer becsukódik**
const isMobile = ref(windowWidth.value < mobileBreakpoint); // **Mobil nézet állapota**
// Menüelemek
const { dashboardLinks } = useNavigation();

const toggleDrawer = () => {
  rail.value = !rail.value;
};

// **Ablakméret figyelése és módosítása**
const updateWindowSize = () => {
  windowWidth.value = window.innerWidth;
  isMobile.value = windowWidth.value < mobileBreakpoint;
};

// **Figyeli az ablakméret változását**
watchEffect(() => {
  if (windowWidth.value < mobileBreakpoint) {
    rail.value = true; // Mobil nézetben alapértelmezetten csukva
    dashboardTitle.value = "";
  } else {
    rail.value = false; // Asztali nézetben alapértelmezetten nyitva
    dashboardTitle.value = "Dashboard";
  }
});

// **Event Listener az ablakméret változásához**
onMounted(() => {
  window.addEventListener("resize", updateWindowSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowSize);
});

// Watcher figyeli a `rail` változót és frissíti az ikont
watch(rail, (newVal) => {
  chevronIcon.value = newVal ? "mdi-chevron-right" : "mdi-chevron-left";
  dashboardTitle.value = newVal ? "" : "Dashboard";
});
</script>

<style scoped>
</style>
