const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
        message: 'Docker Delivery Lab',
        status: 'healthy',
        environment: process.env.APP_ENV || 'development'
    }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
