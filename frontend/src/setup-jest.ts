// src/setup-jest.ts
try {
  // usar require evita problemas de interoperabilidade ESM/CJS
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { setupZoneTestEnv } = require('jest-preset-angular/setup-env/zone');
  setupZoneTestEnv();
} catch (err: any) {
  const msg = err && err.message ? err.message : String(err);
  if (msg.includes('Cannot set base providers because it has already been called')) {
    // ambiente já inicializado: ignorar
  } else {
    throw err;
  }
}