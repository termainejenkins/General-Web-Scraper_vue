// src/backend/proxyServer.js

import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
const app = express();
const port = 3001;

const proxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/scrape/jobBoard'
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  },
});

// Use the proxy middleware
app.use('/api', proxyMiddleware);

// Start the proxy server
app.listen(port, () => {
  console.log(`PROXYSERVER: Proxy server is running on port ${port}  http://localhost:${port} `);
});

