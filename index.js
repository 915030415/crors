const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const cors = require('cors');

const app = express();

// 设置代理规则  
const proxy = createProxyMiddleware({
  target: 'http://183.215.60.23:7021', // 后端服务的地址  
  changeOrigin: true, // 改变请求头中的origin  
  pathRewrite: {
    // '^/api': '/appirms/costnew/plugins/gdApp/optimize' // 重写路径，去掉/api前缀  
  },
  headers: {
    'timestamp': 'your-timestamp-value' // 如果后端需要timestamp头部，可以在这里添加  
  },
  onProxyReq: (proxyReq, req) => {
// 添加自定义请求处理逻辑  
    // 可以在这里添加自定义请求处理逻辑  
  }
});

// 启用CORS，允许所有源访问  
const corsOptions = {  
  origin: '*', // 允许任何源访问  
  // allowedHeaders: ['Content-Type', 'Authorization', 'nonce', 'account','timestamp','token'], // 允许的头部字段  
  allowedHeaders: ['*'], // 允许的头部字段 所有字段都允许
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法  
  preflightContinue: false, // 如果不需要处理 OPTIONS 请求，可以设置为 false  
};

app.use(cors(corsOptions));

// 应用代理到/api路径  
// app.use('/api', proxy);
// 应用代理到正确的路径  
// app.use('/appirms/apicenterNew/api', proxy); // 修改这里以匹配你的请求路径  
app.use('*', proxy);  // 只要是 http://localhost:3000/ 都代理到 http://183.215.60.23:7021 


const PORT = 3000; // 代理服务器端口  
app.listen(PORT, () => {
  console.log(`Proxy server is listening on port ${PORT}`);
});
