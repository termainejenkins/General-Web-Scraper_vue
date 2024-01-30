// src/backend/server.js

import express from 'express';
import cors from 'cors';
import playwright from 'playwright';
import { runMonsterWorker } from './workers/monsterWorker.ts';
import proxyMiddleware from '.src/backend/proxyServer.js';

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

app.use('/api2', proxyMiddleware);

app.post('/api2/test', async (req, res) => {
  console.log('SERVER: Request received:', req.url);
  res.json({ success: true });
  res.end();
  console.log('SERVER: Response sent') });

app.post('/scrape/jobBoard', async (req, res) => {
  console.log('SERVER: Received Job Board scraping request');
  const { websites, jobTitles, locations, headless } = req.body;
  console.log('SERVER: Received Job Board scraping request');

  if (!websites || !jobTitles || !locations) {
    return res.status(400).json({ error: 'Websites, job titles, and locations are required' });
  }

  try {
    // Call the monsterWorker logic
    console.log('Received Job Board scraping request:', { websites, jobTitles, locations, headless });
    const jobBoardData = await runMonsterWorker(websites, jobTitles, locations, headless);

    console.log('SERVER: Job Board Data:', jobBoardData);

    res.json({ success: true, data: jobBoardData });
  } catch (error) {
    console.error('SERVER: Error during Job Board scraping:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/scrape/amazon', async (req, res) => {
  console.log('SERVER: Received Amazon scraping request');
  const { headless } = req.body;
  console.log('SERVER: Received Amazon scraping request');

});

app.post('/scrape/amazon2', async (req, res) => {
  console.log('SERVER: Received Amazon scraping request');
  const { headless } = req.body;
  console.log('SERVER: Received Amazon scraping request');

  const playwright = require('playwright');

  const browser = await playwright.chromium.launch({ headless });
  const page = await browser.newPage();

  await page.goto('https://www.amazon.com');

  // Fill in the search bar
  await page.fill('input[name="field-keywords"]', 'Product Name');
  await page.press('input[name="field-keywords"]', 'Enter');

  // Click the first result
  await page.click('a.a-link-normal');

  // Extract the product details
  const title = await page.title();
  const price = await page.textContent('span[class="a-price-whole"]');
  const rating = await page.textContent('span[class="a-icon-alt a-star-small"]');

  await browser.close();

  res.json({
    title,
    price,
    rating
  });
});

app.listen(port, () => {
  console.log(`SERVER: Server is running on http://localhost:${port}`);
});

