// src/backend/proxyServer.js
import createProxyMiddleware from 'http-proxy-middleware';

// const { createProxyMiddleware } = require('http-proxy-middleware');

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

module.exports = proxyMiddleware;

console.log('Proxy middleware initialized for /scrape');
