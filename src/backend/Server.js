// src/backend/server.js

import express from 'express';
import cors from 'cors';
import playwright from 'playwright';
import { runMonsterWorker } from './workers/monsterWorker';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/scrape/jobBoard', async (req, res) => {
  const { websites, jobTitles, locations, headless } = req.body;

  if (!websites || !jobTitles || !locations) {
    return res.status(400).json({ error: 'Websites, job titles, and locations are required' });
  }

  

  try {
    // Call the monsterWorker logic
    console.log('Received Job Board scraping request:', { websites, jobTitles, locations, headless });
    const jobBoardData = await runMonsterWorker(websites, jobTitles, locations, headless);

    console.log('Job Board Data:', jobBoardData);

    res.json({ success: true, data: jobBoardData });
  } catch (error) {
    console.error('Error during Job Board scraping:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

