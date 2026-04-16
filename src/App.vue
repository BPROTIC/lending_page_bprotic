<script setup>
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Program from './components/Program.vue'
import Roadmap from './components/Roadmap.vue'
import NewsPreview from './components/NewsPreview.vue'
import Event from './components/Event.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <router-view />
  </div>
</template>