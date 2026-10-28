const { createServer } = require('../src/app');

describe('Application HTTP endpoints', () => {
  let server;
  let baseUrl;

  beforeAll(async () => {
    server = createServer();
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
  });

  test('GET / returns the project name and deployment details', async () => {
    const response = await fetch(baseUrl);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/json');
    expect(await response.json()).toEqual({
      project: 'ci-cd-final-project',
      message: 'Deployed with GitHub Actions, Tekton, and OpenShift'
    });
  });

  test('GET /health reports readiness', async () => {
    const response = await fetch(`${baseUrl}/health`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: 'ok' });
  });

  test('unknown routes return 404', async () => {
    const response = await fetch(`${baseUrl}/missing`);
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: 'Not found' });
  });

  test('unsupported methods return 405 with allowed methods', async () => {
    const response = await fetch(baseUrl, { method: 'POST' });
    expect(response.status).toBe(405);
    expect(response.headers.get('allow')).toBe('GET');
    expect(await response.json()).toEqual({ error: 'Method not allowed' });
  });
});
