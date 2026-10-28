const { createServer } = require('./app');

const port = Number(process.env.PORT || 8080);
const server = createServer();
server.listen(port, '0.0.0.0', () => {
  console.log(`Coursera CI/CD Final Project listening on port ${port}`);
});

function shutdown() {
  console.log('Shutting down application');
  server.close(() => process.exit(0));
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
