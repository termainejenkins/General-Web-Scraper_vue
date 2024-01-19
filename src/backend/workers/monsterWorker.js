// src/backend/workers/monsterWorker.ts
import debug from 'debug';
import { chromium } from 'playwright';
import retry from 'async-retry';
const debugMode = true; // Set to true to enable debugging
const headless = true; // Set to false to launch browser in non-headless mode
// Enable debugging if debugMode is true
if (debugMode) {
    debug.enable('*');
}
async function launchBrowser() {
    const browser = await chromium.launch({ headless, devtools: true });
    const page = await browser.newPage();
    return { browser, page };
}
async function closeBrowser(browser) {
    await browser.close();
}
async function scrapeJobListings(page) {
    await page.waitForSelector('.job-listing');
    const jobBoardData = await page.$$eval('.job-listing', (jobListings) => {
        return jobListings.map((listing) => {
            const title = listing.locator('.job-title').innerText();
            const company = listing.locator('.company-name').innerText();
            return { title, company };
        });
    });
    return jobBoardData;
}
async function scrapeJobBoard(websites, jobTitles, locations) {
    const { browser, page } = await launchBrowser();
    try {
        await page.goto(websites);
        await page.locator('#jobTitlesInput').fill(jobTitles);
        await page.locator('#locationsInput').fill(locations);
        await page.click('#searchButton');
        return await scrapeJobListings(page);
    }
    finally {
        await closeBrowser(browser);
    }
}
export async function runMonsterWorker(websites, jobTitles, locations, headless) {
    console.log('Running Monster Worker');
    const { browser, page } = await launchBrowser();
    try {
        await page.goto(websites);
        await page.locator('#jobTitlesInput').fill(jobTitles);
        await page.locator('#locationsInput').fill(locations);
        await page.click('#searchButton');
        while (true) {
            const jobBoardData = await retryScrapeJobListings(page);
            console.log('Job Board Data:', jobBoardData);
            if (debugMode) {
                await page.pause();
            }
            const nextButton = await page.$('button[data-testid="pagination-next-button"]');
            if (nextButton) {
                const nextUrl = await nextButton.evaluate((link) => link.href);
                await Promise.all([
                    page.waitForURL(nextUrl, { waitUntil: 'networkidle' }),
                    nextButton.click(),
                ]);
            }
            else {
                break;
            }
            if (debugMode) {
                await page.pause();
            }
        }
    }
    finally {
        await closeBrowser(browser);
    }
}
async function retryScrapeJobListings(page) {
    return retry(() => scrapeJobListings(page), {
        retries: 3,
        onRetry: (err) => {
            console.log(`Retrying in 1 second... ${err.message}`);
        },
    });
}
// Example usage:
const websites = 'https://example.com';
const jobTitles = 'Software Engineer';
const locations = 'San Francisco';
runMonsterWorker(websites, jobTitles, locations)
    .catch((error) => {
    console.error('Error during Job Board scraping:', error);
    process.exit(1);
});
