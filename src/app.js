const http = require('node:http');

function createServer() {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    console.log(`${request.method} ${request.url}`);

    if (request.method !== 'GET') {
      response.writeHead(405, { Allow: 'GET' });
      response.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    switch (request.url) {
      case '/':
        response.end(JSON.stringify({
          project: 'ci-cd-final-project',
          message: 'Deployed with GitHub Actions, Tekton, and OpenShift'
        }));
        break;
      case '/health':
        response.end(JSON.stringify({ status: 'ok' }));
        break;
      default:
        response.writeHead(404);
        response.end(JSON.stringify({ error: 'Not found' }));
    }
  });
}

module.exports = { createServer };
