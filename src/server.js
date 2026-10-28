const { createServer } = require('./app');

const port = Number(process.env.PORT || 8000);
const server = createServer();
server.listen(port, '0.0.0.0', () => {
  console.log("[INFO] Application initialized");
  console.log("[INFO] SERVICERUNNING");
  console.log(`[INFO] Listening on 0.0.0.0:${port}`);
});

function shutdown() {
  console.log('Shutting down application');
  server.close(() => process.exit(0));
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
