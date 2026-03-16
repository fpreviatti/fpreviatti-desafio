try {
  const { setupZoneTestEnv } = require('jest-preset-angular/setup-env/zone');
  setupZoneTestEnv();
} catch (err: any) {
  const msg = err && err.message ? err.message : String(err);
  if (msg.includes('Cannot set base providers because it has already been called')) {
  } else {
    throw err;
  }
}