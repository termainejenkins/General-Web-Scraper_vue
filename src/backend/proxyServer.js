// src/backend/proxyServer.js

import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 3001;

app.use(cors());

const proxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/scrape/jobBoard'
  },
  onError: (err, req, res) => {
    console.error('PROXYSERVER: Proxy Error:', err);
    res.status(500).send('Proxy Error');
  },

});

// Use the proxy middleware
app.use('/api', proxyMiddleware);

// Start the proxy server
app.listen(port, () => {
  console.log(`PROXYSERVER: Proxy server is running on port ${port} http://localhost:${port}`);
});

proxyMiddleware(req => {
  console.log('PROXYSERVER: Request received:', req.url);
});
