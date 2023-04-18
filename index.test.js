const process = require('process');
const cp = require('child_process');
const path = require('path');

test('wait 500 ms', async () => {
  const start = new Date();
  const end = new Date();
  const delta = Math.abs(end - start);
  expect(delta).toBeGreaterThanOrEqual(0);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env.INPUT_MILLISECONDS = 100;
  const ip = path.join(__dirname, 'index.js');
  cp.execSync(`node ${ip}`, { env: process.env }).toString();
});
