const test = require('node:test');
const assert = require('node:assert/strict');
const net = require('node:net');
const { spawn } = require('node:child_process');

test('Application returns healthy response', async (t) => {

    // Find an available port
    const server = net.createServer();

    await new Promise(resolve =>
        server.listen(0, '127.0.0.1', resolve)
    );

    const port = server.address().port;

    await new Promise(resolve => server.close(resolve));

    // Start application
    const app = spawn(process.execPath, ['app/server.js'], {
        env: { ...process.env, PORT: String(port) },
        stdio: 'ignore'
    });

    t.after(() => app.kill());

    // Wait for application to become available
    let response;

    for (let i = 0; i < 30; i++) {
        try {
            response = await fetch(`http://127.0.0.1:${port}`);
            break;
        } catch {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }

    assert.ok(response, 'Application did not start');

    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.message, 'Docker Delivery Lab');
    assert.equal(body.status, 'healthy');

});
