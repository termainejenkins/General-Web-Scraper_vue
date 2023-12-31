// src/backend/index.js

import express from 'express';
import cors from 'cors';
import playwright from 'playwright';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/scrape/jobBoard', async (req, res) => {
  const { websites, jobTitles, locations, headless } = req.body;

  if (!websites || !jobTitles || !locations) {
    return res.status(400).json({ error: 'Websites, job titles, and locations are required' });
  }

  console.log('Received Job Board scraping request:', { websites, jobTitles, locations, headless });

  try {
    console.log('Launching browser with headless mode:', headless);
    const browser = await playwright.chromium.launch({ headless, devtools: true });
    const page = await browser.newPage();

    // Navigate to the job board website
    await page.goto(websites);

    // Enter job titles and locations into search fields
    // Still need to inspect the job board website to find the correct selectors
    await page.('#jobTitlesInput', jobTitles);
    await page.('#locationsInput', locations);

    // Click on the search button
    await page.click('#searchButton');

    //Wait for the results to load
    await page.waitForSelector('.job-listing');

    // Extract job board data
    const jobBoardData = await page.$$eval('.job-listing', (jobListings) => {
      return jobListings.map((listing) => {
        const title = locator('.job-title').innerText;
        const company = listing.querySelector('.company-name').innerText;
        return { title, company };
      });
    });

    console.log('Job Board Data:', jobBoardData);

    // Add a delay before closing the browser
    await page.waitForTimeout(5000);

    console.log('Closing browser...');
    await browser.close();

    res.json({ success: true, data: jobBoardData });
  } catch (error) {
    console.error('Error during Job Board scraping:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
