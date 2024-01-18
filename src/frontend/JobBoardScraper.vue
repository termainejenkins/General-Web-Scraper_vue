// src/frontend/JobBoardScraper.vue

<template>
    <div>
      <h2>Job Board Scraper</h2>
      <label for="websites">Websites:</label>
      <!-- <input v-model="websites" type="text" id="websites" placeholder="Enter job board websites" /> -->
      <select v-model="selectedWebsite" id="websites">
      <option value="">Select a job board website</option>
      <option v-for="website in websiteOptions" :key="website" :value="website">
        {{ website }}
      </option>
    </select>
  
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
  import { websiteOptions } from '../backend/jobBoardOptions';

  
  // Define selectedWebsite
  const selectedWebsite = ref('');
  const websites = selectedWebsite;
  const jobTitles = ref('');
  const locations = ref('');
  const headless = ref(true);
  

  const scrapeJobBoard = async () => {
    console.log('Starting Job Board scraping...');
  
    try {
      // HTTP requests to the backend for job board scraping
      console.log('Sending request to the backend...');
      const requestarray =[selectedWebsite, websites, jobTitles, locations, headless];      
  
      const response = await fetch('http://localhost:3001/scrape/jobBoard', console.log(requestarray), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websites: websites.value,
          jobTitles: jobTitles.value,
          locations: locations.value,
          headless: headless.value, 
        }),
      });
  
      if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response from the backend:', data);

    // Handle the scraped data
    console.log('Scraped Data:', 'Replace this with actual scraped data');
  } catch (error) {
    console.error('Error during scraping:', error.message || error);
    // Handle or display the error in UI if needed
  }
};
  </script>
  
  <style scoped>
  /* Add component-specific styles here */
  </style>
  ../backend/jobBoardOptions