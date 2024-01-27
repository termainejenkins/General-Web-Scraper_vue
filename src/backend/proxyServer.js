// src/backend/proxyServer.js

import createProxyMiddleware from 'http-proxy-middleware';
import express from 'express';

const app = express();
const port = 3001;



const testproxyMiddleware = createProxyMiddleware=>{
  console.log('proxyserver working');
}


const proxyMiddleware = createProxyMiddleware({
  
  target: 'http://localhost:3002/scrape/jobBoard',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/scrape/jobBoard'
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  },
});

// Add a console.log to test the connection
proxyMiddleware(req => {
  console.log('Request received:', req.url);
});

// Start the proxy server
app.listen(port, () => {
  console.log(`Proxy-server is running on port ${port}`);
});


module.exports = proxyMiddleware, testproxyMiddleware;

console.log('Proxy middleware initialized for /scrape');
