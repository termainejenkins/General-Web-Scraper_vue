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
    <component :is="vueComponent" />
  </div>
</template>

<script>
import amazonScraper from './frontend/amazonScraper.vue';
import jobBoardScraper from './frontend/jobBoardScraper.vue';

export default {
  data() {
    return {
      url: '',
      result: null,
      activeMode: 'general',
    };
  },
  rendered: {
    vueComponent() {
      switch (this.activeMode) {
        case 'general':
          return null;
        case 'amazon':
          return amazonScraper;
        case 'jobBoard':
          return jobBoardScraper;

        default:
          // General mode (default)
          return null;
      }
    },
  },
  methods: {
    async scrape() {
      console.log('APP.VUE: Starting scraping process...');
      
      try {
    console.log('APP.VUE: Sending scraping request to the backend...');
    const response = await fetch(`http://localhost:3001/scrape/${this.activeMode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: this.url }),
      });

        if (!response.ok) {
          throw new Error(`APP.VUE: Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('APP.VUE: Received response from the backend:', data);

        // Handle the scraped data
        console.log('APP.VUE: Scraped Data:', 'Replace this with actual scraped data');
      } catch (error) {
        console.error('APP.VUE: Error during scraping:', error.message || error);
      }
    },
    setMode(mode) {
      console.log(`APP.VUE: Switching mode to...${mode}`);
      this.activeMode = mode;
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
