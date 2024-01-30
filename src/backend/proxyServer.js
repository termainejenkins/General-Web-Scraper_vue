// src/backend/proxyServer.js

import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 3001;

app.use(cors());

// Use the proxy middleware
app.use('/api', proxyMiddleware);

app.post('/api/test', async (req, res) => {
  console.log('PROXYSERVER: Request received:', req.url);
  res.json({ success: true });
  res.end();
  console.log('PROXYSERVER: Response sent');
});

const proxyMiddleware = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api2/test'
  },
  onError: (err, req, res) => {
    console.error('PROXYSERVER: Proxy Error:', err);
    res.status(500).send('Proxy Error');
  },

});



// Start the proxy server
app.listen(port, () => {
  console.log(`PROXYSERVER: Proxy server is running on port ${port} http://localhost:${port}`);
});

// proxyMiddleware(req => {
//   console.log('PROXYSERVER: Request received:', req.url);
// });
