// src/app.vue

<template>
  <div>
    <h1>Web Scraping App</h1>
    <label for="url">URL:</label>
    <input v-model="url" type="text" id="url" />
    <button @click="scrape">Scrape</button>
    <div v-if="result">
      <h2>Scraped Data:</h2>
      <pre>{{ result }}</pre>
    </div>

    <!-- Add mode switcher buttons or menu -->
    <div class="mode-switcher">
      <button @click="setMode('general')">General</button>
      <button @click="setMode('amazon')">Amazon</button>
      <button @click="setMode('jobBoard')">Job Board</button>
    </div>

    <!-- Render the appropriate component based on the current mode -->
    <component :is="currentModeComponent" />
  </div>
</template>

<script>
import AmazonScraper from './frontend/AmazonScraper.vue';
import JobBoardScraper from './frontend/JobBoardScraper.vue';

export default {
  data() {
    return {
      url: '',
      result: null,
      currentMode: 'general',
    };
  },
  computed: {
    currentModeComponent() {
      switch (this.currentMode) {
        case 'amazon':
          return AmazonScraper;
        case 'jobBoard':
          return JobBoardScraper;
        default:
          // General mode (default)
          return null;
      }
    },
  },
  methods: {
    async scrape() {
      console.log('Starting scraping process...');
      
      try {
        console.log('Sending scraping request to the backend...');
        const response = await fetch(`http://localhost:3001/scrape/${this.currentMode}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: this.url }),
        });

        const data = await response.json();
        console.log('Received response from the backend:', data);

        // Handle the scraped data
        console.log('Scraped Data:', 'Replace this with actual scraped data');
      } catch (error) {
        console.error('Error during scraping:', error);
      }
    },
    setMode(mode) {
      console.log(`Switching to ${mode} mode...`);
      this.currentMode = mode;
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
