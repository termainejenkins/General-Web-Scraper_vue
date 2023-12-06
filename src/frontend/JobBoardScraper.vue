// src/frontend/JobBoardScraper.vue
<template>
    <div>
      <h2>Job Board Scraper</h2>
      <label for="websites">Websites:</label>
      <input v-model="websites" type="text" id="websites" placeholder="Enter job board websites" />
  
      <label for="jobTitles">Job Titles:</label>
      <input v-model="jobTitles" type="text" id="jobTitles" placeholder="Enter job titles" />
  
      <label for="locations">Locations:</label>
      <input v-model="locations" type="text" id="locations" placeholder="Enter locations" />
  
      <!-- Add checkbox for headless mode -->
      <label for="headless">Headless:</label>
      <input v-model="headless" type="checkbox" id="headless" />
  
      <button @click="scrapeJobBoard">Scrape Job Board</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const websites = ref('');
  const jobTitles = ref('');
  const locations = ref('');
  
  // ref for headless mode
  const headless = ref(true);
  
  const scrapeJobBoard = async () => {
    console.log('Starting Job Board scraping...');
  
    try {
      // Add logic to make HTTP request to the backend for job board scraping
      console.log('Sending request to the backend...');
  
      const response = await fetch('http://localhost:3001/scrape/jobBoard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websites: websites.value,
          jobTitles: jobTitles.value,
          locations: locations.value,
          headless: headless.value, // Pass the headless option
        }),
      });
  
      const data = await response.json();
      console.log('Received response from the backend:', data);
  
      // Handle the scraped data
      console.log('Scraped Job Board Data:', 'Replace this with actual scraped data');
    } catch (error) {
      console.error('Error during Job Board scraping:', error);
    }
  };
  </script>
  
  <style scoped>
  /* Add component-specific styles here */
  </style>
  